const adDashboard = require('express').Router()
const userSchema = require('../../models/userSchema')
const bookSchema = require('../../models/bookSchema')


adDashboard.get("/", async (req, res)=>{
    
    try{
        const admins = await userSchema.count({userType : "admin"})
        const librarians = await userSchema.count({userType : "librarian"})
        const students = await userSchema.count({userType : "student"})
        const books = await bookSchema.count()


        res.json({books, admins, librarians, students})
 

    }catch(err){
        res.send(err)
        console.log(err)
    }

})

adDashboard.post("/", (req, res)=>{
    res.send("admin with teacher list router post")
})

adDashboard.put("/", (req, res)=>{
    res.send("admin with teacher list router put")
})

adDashboard.delete("/", (req, res)=>{
    res.send("admin with teacher list router delete")
})


module.exports = adDashboard;
