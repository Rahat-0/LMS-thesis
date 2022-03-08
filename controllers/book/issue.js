const res = require('express/lib/response')
const issueSchema = require('../../models/issueSchema')
const userSchema = require('../../models/userSchema')

const issue = require('express').Router()

issue.get('/all', async (req, res)=>{
    try{
        const all = await issueSchema.find({issueValidation : true})
        // 'issueBook issueUser', ('title bookId student name schoolId email')    ***(populate string)***
        .populate('issueBook issueUser', ('title bookId student name schoolId email image'))
         .exec((err, result)=>{
            if(result){
                res.json(result)
            }else{
                console.log(err)
                res.send(err)
            }
         })
    }catch(err){
        if(err){
            res.json(err)
        }else{
            res.json({error : 'server site error'})
        }
    }
})

issue.post("/issuerequest", async (req, res) => {
    try{
        const issueUser = req._id;
        const {issueBook} = req.body;
        
          const  issueschema = new issueSchema({
            issueUser,
            issueBook,
            issueValidation : true,
            issueDate : Date.now()
          })   
       issueschema.save()
       res.json(issueschema)
      console.log(issueschema)

    }catch(err){
        if(err){
            res.json(err)
        }else{
            res.json({error : 'server site error'})
        }
    }
});
   
issue.post('/', async (req, res, next)=>{
    try{
        const issueUser = req._id;
        const {issueBook} = req.body;
        const issueDate = Date.now()
        const issueValidation = false

        const schema = new issueSchema({
            issueUser,
            issueDate,
            issueValidation,
            issueBook
        })
        await schema.save()
        if(schema){
            console.log(schema._id)
          const updates = await userSchema.updateOne({_id : issueUser}, {$push: {book : issueBook} })
          res.json(updates)
        }
        
    }catch(err){
        if(err){
            res.json(err);
          next(err);
          }else{
            res.status(500).json({ error: "server side error" });
          }
    }
   
})

module.exports = issue