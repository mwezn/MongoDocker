const express=require('express')
const router=express.Router();
const User=require('../models/user')


router.post('/addTodo', async (req, res)=>{
    console.log(req.body.data.log)
    let query={email: req.body.data.email}
    let update= { $addToSet: { log: {$each: req.body.data.log} }}
    try{
        const usersData = await User.update(query,update) 
        console.log(usersData)
        return res.status(200).json(usersData); 
        

    } catch(e){
        res.json(e)
    }
})
  

module.exports=router;
