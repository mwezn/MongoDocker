const express=require('express')
const router=express.Router();
const User=require('../models/user')

router.get('/', async (req, res)=>{
    try{
        const users=await User.all
        res.json(users)
    }
    catch(err){
        res.status(500).json(err)
    }
})
router.post('/login', async (req, res)=>{
    let email=req.body.email;
    let pass=req.body.password;

})
module.exports=router;
