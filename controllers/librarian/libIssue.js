const { enabled } = require('express/lib/application')
const issueSchema = require('../../models/issueSchema')
const userSchema = require('../../models/userSchema')

const libIssue = require('express').Router()

libIssue.get('/', (req, res)=>{
    res.json('issues')
})

libIssue.post('/recive', async (req, res)=>{
    try{
        const { issueUser, issueBook} = req.body;
        console.log(issueUser)
        const result = await userSchema.updateOne({_id : issueUser}, {$push : {book : issueBook}})
        if(result.modifiedCount === 1){
            const newresult = await issueSchema.updateOne({issueUser}, {issueValidation : false})
            if(newresult.modifiedCount === 1){
                res.json({message : 'request recive success'})
            }else{
                res.json({message : 'already recived'})
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
        const result = await issueSchema.updateOne({issueUser}, {issueValidation : false})
        
        if(result.modifiedCount === 1){
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