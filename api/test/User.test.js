const User = require('../models/user');

describe('User', () => {
  
  it('Gets all users', async ()=>{
    const users= await User.all;
    expect(users).toBeInstanceOf(Array)
  })

  
  it("It finds users by email", async () =>{
    const result = await User.findByEmail("blabla@gmail.com");
    expect(result).toBeInstanceOf(User)
  })
  
  it('Inserts a new user doc into collection', async () => {
    await User.delete({email: "johnsemail@mail.com"})
    const mockUser = {email:"johnsemail@mail.com", username: 'John', password:"12345",log:[], overdue:[], done:[]};
    const result = await User.create(mockUser);
    const insertedUser = await User.findByEmail('johnsemail@mail.com');
    expect(insertedUser).toEqual(result);
  });

});

