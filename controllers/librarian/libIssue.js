const { enabled } = require('express/lib/application')
const bookSchema = require('../../models/bookSchema')
const issueSchema = require('../../models/issueSchema')
const userSchema = require('../../models/userSchema')

const libIssue = require('express').Router()

libIssue.get('/', (req, res)=>{
    res.json('issues')
})

libIssue.post('/recive', async (req, res)=>{
    try{
        const { issueUser, issueBook} = req.body;
        const result1 = await userSchema.updateOne({_id : issueUser}, {$push : {book : issueBook}})
        const result2 = await bookSchema.updateOne({_id : issueBook}, {$push : {issueUser}})
        console.log(result2)
        if(result1.modifiedCount && result2.modifiedCount === 1){
            const newresult = await issueSchema.updateOne({issueUser, issueBook}, {issueValidation : false})
            if(newresult.modifiedCount === 1){
                res.json({message : 'request recive success'})
            }else{
                res.json({error : 'already recived'})
            }
        }else{
            console.log('error occour')
            res.json({error : 'request failed!'})
        }
    }catch(err){
        console.log(err)
        res.json(err)
    }
})

libIssue.post('/reject', async (req, res)=>{
    try{
        const { issueUser, issueBook} = req.body;
        console.log(issueUser + ' and ' + issueBook)
        const result = await issueSchema.deleteOne({issueUser, issueBook})
        console.log(result)
        if(result.deletedCount === 1){
            res.json({message : 'delete request success'})
        }else{
            res.json({error : 'delete request failed!'})
        }
    }catch(err){
        console.log(err)
        res.json(err)
    }
})



module.exports = libIssue;