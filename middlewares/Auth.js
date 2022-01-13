const jwt = require('jsonwebtoken')

const Auth = async (req, res, next) =>{
    try{
        const {auth} = req.headers;
        const decoded = jwt.verify(auth, process.env.JWT_SECRET)
        const {_id, schoolId, userType, name} = decoded;
        req.name = name
        req._id = _id
        req.schoolId = schoolId
        req.userType = userType
        next()
    }catch(err){
      return  res.json( err + 'unauthorized token')
    }
    
    
}

module.exports = Auth;