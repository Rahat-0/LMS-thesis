const fs = require('fs')
const schema = require('../../models/userSchema')
const upload = require('../../middlewares/fileUpload')
const adStudent = require('express').Router()

adStudent.get("/", async (req, res)=>{
    
  
    try{
       await schema.find({userType : "student" })
        .then((result)=>{
            res.json(result)
        })
        .catch(err =>{
            console.log(err)
            res.send(err)
        })

    }catch(err){
        res.send(err)
        console.log(err)
    }

})

adStudent.post("/", async (req, res)=>{
    const {schoolId} = req.body;
    
    try{
        await schema.find({schoolId})
         .then((result)=>{
             const {name, email, schoolId, gender, userType, profileImage, mobile} = result[0];
            res.json({name, email, schoolId, gender, userType, profileImage, mobile})
         })
         .catch(err =>{
             console.log(err)
             res.send(err)
         })
 
     }catch(err){
         res.send(err)
         console.log(err)
     }
})

adStudent.get("/:id", async (req, res)=>{
    const schoolId = req.params['id'];
    console.log(schoolId)
    try{
        await schema.findOne({schoolId})
         .populate('book', ('title author bookId'))
         .exec((err, result)=>{
            if(result){
                const {schoolId, name, email, book, gender, profileImage, userStatus, mobile, bio} = result;
                res.json({schoolId, name, email, book, gender, profileImage, userStatus, mobile, bio})
            }else{
                res.send(err)
            }
         })
 
     }catch(err){
         res.send(err)
         console.log(err)
     }
     
})

adStudent.put("/",upload.single("profileImage"), async (req, res)=>{
    const {name, email, schoolId, gender, mobile, pre} = req.body;
    const file = req.file;
    try{
        await schema.updateOne({schoolId},{ $set : {name, email, mobile , gender, profileImage : file ? file.filename : pre}})
        .then((result)=>{
            if(file){
                const remove = `./public/image/${pre === 'default.png' ? null: pre }`
                fs.unlink(remove, (err)=>{
                    if(err){
                        console.log(err)
                    }
                })
            }
            if(result.modifiedCount === 1)
            {
                res.json({message : "update success!"})
            }else if(result.matchedCount === 1 && result.modifiedCount === 0){
                res.json({warn : "nothing changeses yet"})
            } else{
                res.json({error : "update fail!"})
            }  
        })
        .catch(err => res.json(err + " error here"))

    }catch(err){
        if(err){
            res.json(err + ' catch error')
        }
        else{
            res.json({error : " server side error"})
        }
    }
})

adStudent.put("/status", async (req, res)=>{
    try{
        const {schoolId, userStatus} = req.body;
        const result =  await schema.updateOne({schoolId}, {$set : {userStatus}})
        if(result.modifiedCount === 1){
            res.json({message : 'status updated'})
        }else{
            res.json({error : 'status update fail'})
        }
        

    }catch(err){
        console.log(err)
        res.json({error : "status update fail"})
    }
})

adStudent.delete("/", async (req, res)=>{
    
    try{
        const {schoolId} = req.body;
        const data = await schema.deleteOne({schoolId})
        if(data.deletedCount === 1){
            res.json({message : 'delete success'})
        }else{
            res.json({message : 'delete fail!'})
        }
        

    }catch(err){
        console.log(err.message)
        res.json(err.message)
    }
})


module.exports = adStudent;
