const schema = require('../models/userSchema')
const test = async (req, res, next)=>{
    schema.count()
    .then((data)=>{
        console.log(data)
        res.json(data)
    })
    .catch(err=>{
        console.log(err)
        next('custom' + err)
    })
}
module.exports = test;