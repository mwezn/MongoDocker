const supertest = require('supertest');
const app = require("../server");
const request= supertest(app)

describe('api test', () => {
    it('It gets all users endpoint', async ()=> {
        const res = await request.get("/");
        expect(res.statusCode).toBe(200)
    });
    it('Cant register with taken emails', async ()=>{
        let body={data:{user: "random", email: "test@gmail.com", password: 111}}
        const res=await request.post("/register")
           .send(body)
        expect(res.statusCode).toBe(400)
    })
    it('Cant login with unknown emails', async ()=>{
        const body = {data: {email: "test1@gmail.com", password: 111}}
        const res=await request.post("/login")
           .send(body)
        expect(res.statusCode).toBe(400)
    })
    it('Adds todos for correct user', async()=>{
        const body={data: {todo: ["Addme"]}}
        const res= await request.post("/addTodo")
            .send(body)
    })
    it('Can delete user', async()=>{
        const res=await request.delete("/:id")
    })
});
