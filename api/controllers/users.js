const express=require('express')
const router=express.Router();
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
    const email =req.body.data.email
    const pass=req.body.data.password
    console.log(email,pass)
    try {
        const user=await User.findByEmail(email);
        res.json(user)
    }
    catch(err){
        res.status(500).json(err)
    }

})
module.exports=router;
