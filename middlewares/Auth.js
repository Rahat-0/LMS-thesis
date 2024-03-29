const jwt = require('jsonwebtoken')

const Auth = async (req, res, next) =>{
    try{
        const {auth} = req.headers;
        const auths = auth.split(' ')[1]
        const decoded = jwt.verify(auths, process.env.JWT_SECRET)
        const {_id, schoolId, userType, name, userStatus} = decoded;
        req.name = name
        req.status = userStatus
        req._id = _id
        req.schoolId = schoolId
        req.userType = userType
        next()
    }catch(err){
      return  res.json({authError : 'unauthorized person, Access Denied'})
    }
    
    
}

module.exports = Auth;