const express=require('express')
const router=express.Router();
const bcrypt = require('bcryptjs');
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
        console.log(user)
        const correct= await bcrypt.compare(password, user.password.toString());
        if(correct){
            const token= jwt.sign({username:user.username,email:user.email}, 'my_secret_key2')
            console.log(token)
            return res.status(200).json({user: user, token: token,text: "Login Successful"});
        }
        else return res.status(401).json("Wrong password") //unauthorised http response
    } catch(err){
      console.log(err);
      res.status(400).json({ err });
    }
})

router.post('/register', async (req, res) => {
    const user=req.body.data.user;
    const email=req.body.data.email;
    const password=req.body.data.password.toString()
  try {
      const checkemail = await User.findByEmail(req.body.data.email)
      if(checkemail.length!==0) {
          return res.status(400).send("Email already exists")
      }
    } catch(err){
       console.log(err)
       const salt = await bcrypt.genSalt();
       const hashed = await bcrypt.hash(password, salt)
       console.log(hashed)
       const data = {username: user, email: email, password: hashed}
       console.log(data)
       const result = await User.create(data)
       if (!result){
           return res.status(500).json({msg: 'user couldnt be registered'})
       }
       res.status(200).json({msg: 'User created',newuser: result})
   }
})

router.delete('/:id', async (req, res)=>{
    try {
        const d = await User.delete({_id: req.params.id})
        res.json(d)
    } catch(err) {
        res.status(500).json({err})
    }
  })
  

module.exports=router;
