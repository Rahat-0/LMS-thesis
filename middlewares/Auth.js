const jwt = require('jsonwebtoken')

const Auth = async (req, res, next) =>{
    try{
        const {athentication} = req.headers;
        const decoded = jwt.verify(athentication, process.env.JWT_SECRET)
        const {_id, schoolId, userType} = decoded;
        req._id = _id
        req.schoolId = schoolId
        req.userType = userType
        next()
    }catch(err){
      return  res.send('unauthorized token')
    }
    
    
}

module.exports = Auth;