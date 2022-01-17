const adLibrarin = require('express').Router()
const schema = require('../../models/userSchema')

adLibrarin.get("/", async (req, res)=>{
    
    try{
       await schema.find({userType : "librarian"})
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

adLibrarin.post("/", (req, res)=>{
    res.send("admin with teacher list router post")
})

adLibrarin.put("/", (req, res)=>{
    res.send("admin with teacher list router put")
})

adLibrarin.delete("/", (req, res)=>{
    res.send("admin with teacher list router delete")
})


module.exports = adLibrarin;
