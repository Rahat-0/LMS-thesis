const adLibraria = require('express').Router()

adLibraria.get("/", (req, res)=>{
    res.send("admin with teacher list router get")
})

adLibraria.post("/", (req, res)=>{
    res.send("admin with teacher list router post")
})

adLibraria.put("/", (req, res)=>{
    res.send("admin with teacher list router put")
})

adLibraria.delete("/", (req, res)=>{
    res.send("admin with teacher list router delete")
})


module.exports = adLibraria;
