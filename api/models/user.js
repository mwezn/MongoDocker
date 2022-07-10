const { init } = require ('../dbConfig')
const { ObjectId } = require('mongodb')
class User {
    constructor(data){
        this.id = data.id
        this.email= data.email
        this.username=data.username
        this.password=data.password
        this.log=data.log?data.log:[]
        this.overdue=data.overdue?data.overdue:[]
        this.done=[]=data.done?data.done:[]
    }
    static get all() {
        return new Promise (async (resolve, reject) => {
            try {
                const db = await init()
                const userData = await db.collection('users').find().toArray()
                const users = userData.map(d => new User({ ...d, id: d._id}))
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
                reject("Email not found");
            }
        });
    }
    static create(data) {
        return new Promise (async (res, rej) => {
           try {
              const db = await init();
              console.log("hello I'm into create function")
              
              let newuser= await db.collection('users').insertOne(data)
              console.log(newuser.ops[0]);
              let newUser= new User(newuser.ops[0])
              res(newUser)
  
           } catch (err) {
              rej(`Error creating user: ${err}`);
           }
        })
     }

     static update(doc,update) {
        return new Promise (async (res, rej) => {
           try {
              const db = await init();
              let updatedLogData = await db.collection('users').findOneAndUpdate(doc, update, { returnOriginal: false })
                let updatedLog = new User(updatedLogData.value);
                res(updatedLog);
  
           } catch (err) {
              rej(`Error creating user: ${err}`);
           }
        })
     }
     static delete(query){
         return new Promise (async (res, rej)=>{
            try {
                const db = await init();
                let updatedLogData = await db.collection('users').findOneAndDelete(query)
                  res(updatedLogData);
    
             } catch (err) {
                rej(`Error deleting user: ${err}`);
             }

         })
     }
     static async updateEach(){
               let time=new Date();
               let T=time.toISOString();
               let GMT= time.toLocaleTimeString([],{hour:'2-digit', minute:'2-digit',hour12:false})
                const db = await init();
                let updatedLogData = await db.collection('users').find({}).forEach(function(d) {
                    console.log(d)
                    d.overdue = d.log.filter(function(v) { return v.date==T.slice(0,10) && v.time < GMT })
                    console.log(d)
                    //d.Information = d.Information.filter(function(v) { return v.id != 101 })
                    db.collection('users').save(d)
                })
                return updatedLogData
               
            }
    }



module.exports= User;
