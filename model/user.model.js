const mongoose = require("mongoose")


const userSchema = mongoose.Schema({
    username:"string",
    email:"string",
    pass:"string"
},{
    versionKey:false
}

)

const UserModel=mongoose.model("user",userSchema)

module.exports={
    UserModel
}