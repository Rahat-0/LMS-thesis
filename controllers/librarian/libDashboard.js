const libDashboard = require('express').Router()
const userSchema = require('../../models/userSchema')
const bookSchema = require('../../models/bookSchema')

libDashboard.get('/', async (req, res)=>{
        try{
            const student = await userSchema.count({userType : "student"})
            const issuerequest = await userSchema.count({userType : "student"})
            const deactiveuser = await userSchema.count({userStatus : "deactive"})
            const books = await bookSchema.count()

            res.json({books, student, issuerequest, deactiveuser})
     
    
        }catch(err){
            res.send(err)
            console.log(err)
        }
    
    })

module.exports = libDashboard;