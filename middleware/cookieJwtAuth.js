import express from "express";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import { filterUserModel } from "../model/users.model.js";

const app = express();
app.use(cookieParser());
const accessTokenSecret = "youraccesstokensecret";

var databaseName = "mydb";
var tableName = "users";

export const cookieJwtAuth = async (req, res, next) => {
    // console.log("REQ", req.method , req.baseUrl, req.url)
    res.cookie("access_token", req.cookies.access_token);
     
    const access_token = req.cookies.access_token;
    const decoded_token = jwt.decode(access_token)
    console.log(decoded_token)
    let user = {
        email: decoded_token.email,
        password: req.body.password,
      };



    if (access_token) {
        jwt.verify(access_token, { email: user.email, password: user.password }, accessTokenSecret, (err) => {
            next();
        })

        const method = req.method;
        const [result] = await filterUserModel (databaseName, tableName,{email:user.email})
        console.log(result);
        
    } else {
        return res.status(401).send('Unauthorized');
    }
};