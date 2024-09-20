const {jwtAuthMiddleware,generateToken} = require('../jwt')
const express  =  require("express")
const router  = express.Router();
const User  = require("./../models/user")



router.get('/profile',jwtAuthMiddleware,async( req,res)=>{
    try {
        const userData =req.user;
        console.log({"user data": userData})

        const userId = userData.userData.id;
        const user = await User.findById(userId);
        res.status(200).json({user});

        
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"internal error in server" })
    }
    
})
    
router.post('/signup' , async (req , res)=>{
    try {
        const data = req.body
        const newUser = new User(data);

        const response = await newUser.save();
        console.log("saved user's data");
        const payload ={
            id: response.id,
        }
        const token = generateToken(payload);
        console.log({"token is": token});
        res.status(201).json({response:response});
    }
     catch(error){
        console.log( error);
        res.status(500).json({error:"internal error in server" })
     }
} ) 

router.post('/login' ,async(req, res)=>{
    try {
    const {email, password} = req.body;
    const user= await User.findOne({email:email});
    
    if(!user || !( await user.comparePassword(password))) {
        return res.status(401).json({error: "Invalid user or Password"})
    }
   
        const payload={
            id: user.id,
        };
        const token = generateToken(payload);
        res.json(token);
    } catch (error) {
        console.log( error);
        res.status(500).json({error:"internal error in server" })
    }
})



router.put('/profile/password' ,jwtAuthMiddleware,async (req  , res)=>{
    try {
        const userId = req.user.userData.id;
      
        const {currentPassword , newPassword} = req.body;
     
        const user = await User.findById(userId);

        if(!user ||!(await user.comparePassword(currentPassword))){
            return res.status(401).json({error: "Invalid user or Password"})
        }

        user.password = newPassword;
        await user.save();
        console.log("password updated");
        res.status(200).json({message:"password updated"});

    } catch (error) {
        console.log( error);
        res.status(500).json({error:"internal error in server" })
    }
})



module.exports = router;