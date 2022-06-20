const express=require('express')
const router=express.Router();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const User=require('../models/user')

router.get('/', async (req, res)=>{
    try{
        const users=await User.all;
        res.json(users)
    }
    catch(err){
        res.status(500).json(err)
    }
})

router.post('/login', async (req, res)=>{
    const email = req.body.data.email
    const password=req.body.data.password.toString();
    try {
        const user  =  await User.findByEmail(email)
        console.log("This is printed by controllers/auth.js")
        const correct= await bcrypt.compare(password, user.password.toString());
        if(correct){
            const token= jwt.sign({username:user.username,email:user.email}, 'my_secret_key2')
            console.log(token)
            return res.status(200).json({token: token,text: "Login Successful"});
        }
        else return res.status(403).json("Wrong password") //unauthorised http response
    } catch(err){
      console.log(err);
      res.status(401).json({ err });
    }
})

module.exports=router;
