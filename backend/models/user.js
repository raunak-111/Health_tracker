var mongoose  = require("mongoose");
const bcrypt = require('bcrypt')

const userSchema   = new mongoose.Schema( {
    name : {
        type: String,
        required : true
    },
    age : {
        type : Number,
        required :true
    },
    email:{
        type:String
    },
    password:{
        type : String,
        required:true
    },
})


// pre is a middleware
userSchema.pre('save',async function (next){
    const user = this;
    // hash the password only when  password is modify or generate
    if(!user.isModified('password'))  return next();  
  try {
        //genrating salt
        const salt =await bcrypt.genSalt(10);
        // hashing of password
        const hashedPassword  = await bcrypt.hash(user.password , salt);
         // overiding the plain password with hashed pass
        user.password = hashedPassword;

        next(); 
  } catch (error) {
    return next(error)
  }  
})

// comparig pass
userSchema.methods.comparePassword = async function(candidatePassword ){
    try {
        console.log("comparing pass")
        const isMatch = await bcrypt.compare(candidatePassword , this.password);
        return isMatch;
        
    } catch (error) {   
        console.log(error)
        throw error;
    }
}

const User = mongoose.model("User", userSchema)
module.exports = User;