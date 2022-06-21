const db = connect("mongodb://localhost:27017/todousers")

db.users.insertMany([
    {email:'blabla@gmail.com',username:"blabla",password:111,
    log:[2,3,4,5,7,8,9,100,1000]}
])
