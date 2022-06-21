const { init } = require ('../dbConfig')
const { ObjectId } = require('mongodb')
class User {
    constructor(data){
        this.id = data.id
        this.email= data.email
        this.username=data.username
        this.password=data.password
        this.log=[]
        this.overdue=[]
        this.done=[]
    }
    static get all() {
        return new Promise (async (resolve, reject) => {
            try {
                const db = await init()
                const userData = await db.collection('users').find().toArray()
                const users = userData.map(d => new User({ ...d}))
                resolve(users);
            } catch (err) {
                console.log(err);
                reject("Error retrieving users")
            }
        })
    }

    static findByEmail(email) {
        return new Promise (async (resolve, reject) => {
            try {
                const db = await init();
                let userData = await db.collection('users').find({ 'email': email}).toArray()
                let user = new User({...userData[0], id: userData[0]._id});
                resolve(user);
            } catch (err) {
                reject('Email not found');
            }
        });
    }
    static create(data) {
        return new Promise (async (res, rej) => {
           try {
              const db = await init();
              console.log("hello I'm into create function")
              let newuser= await db.collection('users').insertOne({
                 username: data.username, 
                 email: data.email, 
                 password: data.password
              })
              // let newUser = new User(user.ops[0]);
              console.log("This is the user has been created into models/User.js")
              console.log(newuser)
              res(`user created succesfully`)
  
           } catch (err) {
              rej(`Error creating user: ${err}`);
           }
        })
     }

}
module.exports= User;
