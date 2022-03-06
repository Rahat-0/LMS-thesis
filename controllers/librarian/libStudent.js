const libStudent = require('express').Router()
const userSchema = require('../../models/userSchema')
const upload = require('../../middlewares/fileUpload')
const fs = require('fs')

libStudent.get('/', async (req, res)=>{
  try{
    await userSchema.find({userType : "student" })
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
libStudent.get('/deactiveuser', async (req, res)=>{
    try{
        await userSchema.find({userStatus : "deactive" })
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

libStudent.get("/:id", async (req, res)=>{
    const schoolId = req.params['id'];
    console.log(schoolId)
    try{
        await userSchema.findOne({schoolId})
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

libStudent.post("/", async (req, res)=>{
    const {schoolId} = req.body;
    
    try{
        await userSchema.find({schoolId})
         .then((result)=>{
             console.log(result)
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

libStudent.put("/",upload.single("profileImage"), async (req, res)=>{
    const {name, email, schoolId, gender, mobile, pre} = req.body;
    const file = req.file;
    try{
        await userSchema.updateOne({schoolId},{ $set : {name, email , mobile, gender, profileImage : file ? file.filename : pre}})
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

libStudent.put("/status", async (req, res)=>{
    try{
        const {schoolId, userStatus} = req.body;
        const result =  await userSchema.updateOne({schoolId}, {$set : {userStatus}})
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

libStudent.delete("/", async (req, res)=>{
    
    try{
        const {schoolId} = req.body;
        const data = await userSchema.deleteOne({schoolId})
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

module.exports = libStudent