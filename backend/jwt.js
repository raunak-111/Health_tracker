const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req,res, next)=>{

    const authorization = req.headers.authorization;
    if(!authorization) {
       return res.status(401).json({error: "token not found"});
    }

   
        const token =req.headers.authorization.split(' ')[1];
        if(!token) return res.status(401).json({error:"unotherized"});

        try {
            const decoded= jwt.verify(token, process.env.JWT_SECRET);
            console.log(decoded);
            req.user = decoded;
            next();
        } catch (error) {
            console.error(error)
            res.status(401).json({error:"invalid token"})
        }
}

//function to create secret key 

const generateToken =(userData)=>{
    return jwt.sign({userData}, process.env.JWT_SECRET);
}

module.exports = {jwtAuthMiddleware, generateToken};
