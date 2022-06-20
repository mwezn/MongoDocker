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
                const users = userData.map(d => new User({ ...d, id: d._id }))
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
                resolve (userData);
            } catch (err) {
                reject('User not found');
            }
        });
    }


}
module.exports= User;
