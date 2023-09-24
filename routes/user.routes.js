const express=require("express")
const {UserModel}=require("../model/user.model")
const userRouter= express.Router()
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

userRouter.post("/register",async(req,res)=>{
const {username,email,pass}=req.body
try {
    bcrypt.hash(pass, 5, async(err, hash)=> {
      const user = new UserModel({username,email,pass:hash})
      await user.save()
      res.status(200).send({"msg":"A new user has been register"})
    });
} catch (error) {
    res.status(4000).send({"err":error})
}

})





    userRouter.post("/login",async(req,res)=>{
        const {email,pass}=req.body
        try {
          const user = await UserModel.findOne({email}) 
          // console.log(user)
          if(user){
            bcrypt.compare(pass, user.pass, (err, result)=>{
              const token=jwt.sign({userID:user._id,username:user.username }, 'masai',{expiresIn:"11h"})
            
               if(result){
                res.status(200).send({"msg":"Login successfull","token":token})
               }else{
                res.status(200).send({"msg":"wrong Credentials"})
               }
            })
           
          }  else{
            res.status(200).send({"msg":"wrong Credentials"})
          }
        } catch (err) {
          res.status(400).send({"error":err}) 
        }
    })





module.exports={
    userRouter
}





