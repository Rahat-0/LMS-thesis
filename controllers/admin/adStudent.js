const schema = require('../../models/userSchema')
const userValidation = require('../../middlewares/userValidation')
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
                const {schoolId, name, email, book, gender} = result;
                res.json({schoolId, name, email, book, gender})
            }else{
                res.send(err)
            }
         })
 
     }catch(err){
         res.send(err)
         console.log(err)
     }
     
})

adStudent.put("/", async (req, res)=>{
    const {name, email, schoolId, gender} = req.body;

    try{
        await schema.updateOne({schoolId},{ $set : {name, email , gender}})
        .then((result)=>{
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
    console.log(schoolId)
    
    try{
        await schema.find({schoolId})
         .then((result)=>{
             const {name, email, schoolId, gender, userType} = result[0];
            res.json({name, email, schoolId, gender, userType})
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
