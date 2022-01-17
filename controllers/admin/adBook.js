const adBook = require('express').Router()

adBook.get("/", (req, res)=>{
    res.send("admin with book list router get")
})

adBook.post("/", (req, res)=>{
    res.send("admin with book list router post")
})

adBook.put("/", (req, res)=>{
    res.send("admin with book list router put")
})

adBook.delete("/", (req, res)=>{
    res.send("admin with book list router delete")
})


module.exports = adBook;
