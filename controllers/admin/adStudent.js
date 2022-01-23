const schema = require('../../models/userSchema')
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
 

adStudent.put("/", async (req, res)=>{
    const email = undefined

    try{
        await schema.updateOne({schoolId : 200},{ $set : {name : "someting", email}})
        .then((result)=>{
            res.json(result)
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
    const {update} = req.body;
    console.log(update)
    
    try{
        await schema.find({ schoolId : update || undefined })
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
