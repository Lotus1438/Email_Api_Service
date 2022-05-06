import {  createRethinkClient} from "../lib/rethink.js"
import jwt from 'jsonwebtoken';
const accessTokenSecret = 'youraccesstokensecret';
// const refreshTokenSecret = 'yourrefreshaccesstokensecret';


var databaseName = "mydb";
var tableName = "users";
const r = createRethinkClient()

//login
export const loginUser = async (req, res) => {
  
  let user = {
    email: req.body.email,
    password: req.body.password,
  };

 const login = await r.db(databaseName)
    .table('users')
    .filter({"email": user.email})
    .run(req._rdb)

    if (Object.keys(login).length > 0 ) {
        user.password === login[0].password;
        const accessToken = jwt.sign({ email: user.email,  password: user.password }, accessTokenSecret);
        // const refreshToken = jwt.sign({ email: user.email, password: user.password }, refreshTokenSecret);

        // refreshTokens.push(refreshToken);

        res.json({
          accessToken})
    } else {
      res.send('Email or Password is incorrect')
    }
};

//get all users
export const getAllUsers = (req, res) => {
  r.db(databaseName)
    .table(tableName)
    .run(req._rdb)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => console.log(error));
};

