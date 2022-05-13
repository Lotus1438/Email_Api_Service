import express from "express";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

const app = express();
app.use(cookieParser());
const accessTokenSecret = "youraccesstokensecret";

export const cookieJwtAuth = (req, res, next) => {
    res.cookie("access_token", req.cookies.access_token);
    let user = {
      email: req.body.email,
      password: req.body.password,
    };

    const access_token = req.cookies.access_token;

    if (access_token) {
        jwt.verify(access_token, { email: user.email, password: user.password }, accessTokenSecret, (err) => {
            next();
        })
        
    } else {
        return res.status(401).send('Unauthorized');
    }

};

// export const authPage = (req, res, next) => {}