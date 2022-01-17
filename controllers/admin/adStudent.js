const schema = require('../../models/userSchema')
const adStudent = require('express').Router()

adStudent.get("/", async (req, res)=>{

    try{
       await schema.find({userType : "student"})
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





adStudent.post("/", (req, res)=>{
    res.send("admin with student list router post")
})

adStudent.put("/", (req, res)=>{
    res.send("admin with student list router put")
})

adStudent.delete("/", (req, res)=>{
    res.send("admin with student list router delete")
})


module.exports = adStudent;
