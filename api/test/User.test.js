const User = require('../models/user') 
const {MongoClient} = require('mongodb');

describe('User', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(globalThis.__MONGO_URI__, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db(globalThis.__MONGO_DB_NAME__);
  });

  afterAll(async () => {
    await connection.close();
  });

  it('Gets all users', async ()=>{
    const users= await User.all;
    expect(users).toBeInstanceOf(Array)

  })

  it('should insert a doc into collection', async () => {
    const users = db.collection('users');
    const mockUser = {_id: 'some-user-id', name: 'John'};
    await users.insertOne(mockUser);

    const insertedUser = await users.findOne({_id: 'some-user-id'});
    expect(insertedUser).toEqual(mockUser);
  });
  it("It finds users by email", async () =>{
    const result = await User.findByEmail("blabla@gmail.com");
    expect(result).toBeInstanceOf(User)
  })
  it("It returns email not found ", async () =>{
    const result = await User.findByEmail("blabla2@gmail.com");
    expect(result).toThrow();
  })

});

/*
const { initConnection } = require('../db_config/dbconfig')

describe('User', () => {
    let connection;
    let db;

    beforeAll(async () => {
        connection = await initConnection;
        db = await connection.db(process.env.DB_NAME);
    });

    afterAll(async () => {
        await connection.close();
    });


    describe('findByEmail', () => {
        test('it resolves with a user on a successful db query', async () => {
            let userData = {
                userEmail: "test@email.com",
                userName: "testtest",
                password: "testpassword",
                // token input

            };
            const result = await User.findByEmail({userEmail: "test@email.com"});
            expect(result).toBeInstanceOf(User)
        });
    });
});


*/
