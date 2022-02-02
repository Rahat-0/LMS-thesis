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

adStudent.post("/view", async (req, res)=>{
    const {schoolId} = req.body;
    try{
        await schema.findOne({schoolId})
         .populate('book', ('title author bookId'))
         .exec((err, result)=>{
            if(result){
                const {schoolId, name, email, book, gender, profileImage} = result;
                res.json({schoolId, name, email, book, gender, profileImage })
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
    const {name, email, schoolId, gender, pre} = req.body;
    const file = req.file;
    try{
        await schema.updateOne({schoolId},{ $set : {name, email , gender, profileImage : file ? file.filename : pre}})
        .then((result)=>{
            if(file){
                const remove = `./public/image/${pre}`
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

adStudent.post("/", async (req, res)=>{
    const {schoolId} = req.body;
    
    try{
        await schema.find({schoolId})
         .then((result)=>{
             const {name, email, schoolId, gender, userType, profileImage} = result[0];
            res.json({name, email, schoolId, gender, userType, profileImage})
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

adStudent.delete("/", (req, res)=>{
    res.send("admin with student list router delete")
})


module.exports = adStudent;
