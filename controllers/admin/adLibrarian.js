const adLibrarin = require('express').Router()
const schema = require('../../models/userSchema')
const bcrypt = require('bcrypt')
const userValidation = require('../../middlewares/userValidation')
const upload = require('../../middlewares/fileUpload')

adLibrarin.get("/", async (req, res)=>{
    
    try{
       await schema.find({userType : "librarian"})
        .then((result)=>{
            res.json(result)
        })
        .catch(err =>{
            console.log(err)
            res.send(err)
        })

    }catch(err){
        res.send(err)
        console.log(err)
    }

})

adLibrarin.post("/",  upload.single('image'), userValidation,  async (req, res)=>{
    try {
        const { schoolId, name, password, email, gender } = req.valid;
        const profileImage = req.file ? req.file.filename : undefined
        const pass = await bcrypt.hash(password, 10);
    
        const schemas = await new schema({
          schoolId,
          name,
          password: pass,
          email, 
          userType : "librarian",
          gender,
          profileImage
        });
        await schemas.save()
        res.status(201).json({ message: schemas });
        
      } catch (err) {
        if (err.keyPattern.schoolId) {
          res.status(200).json({ vError: "schoolId already exist" });
        } else if (err.keyPattern.email) {
          res.status(200).json({ vError: "email already exist" });
        } else if(err){
          res.json(err);
        next(err);
        }else{
          res.status(500).json({ error: "server side error" });
        next(err)
        }
      }
})

adLibrarin.put("/", (req, res)=>{
    res.send("admin with teacher list router put")
})

adLibrarin.delete("/", (req, res)=>{
    res.send("admin with teacher list router delete")
})


module.exports = adLibrarin;
