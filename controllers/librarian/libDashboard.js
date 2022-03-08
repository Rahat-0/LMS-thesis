const libDashboard = require('express').Router()
const userSchema = require('../../models/userSchema')
const bookSchema = require('../../models/bookSchema')
const issueSchema = require('../../models/issueSchema')

libDashboard.get('/', async (req, res)=>{
        try{
            const student = await userSchema.count({userType : "student"})
            const issuerequest = await issueSchema.count({issueValidation : true})
            const deactiveuser = await userSchema.count({userStatus : "deactive"})
            const books = await bookSchema.count()
            console.log(issuerequest)
            res.json({books, student, deactiveuser, issuerequest})
     
    
        }catch(err){ 
            res.send(err)
            console.log(err)
        }
    
    })

module.exports = libDashboard;