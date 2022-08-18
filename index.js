import dotenv from 'dotenv'
dotenv.config()

// libraries
import  express  from "express";
import cors from  "cors";
import helmet from "helmet";

// mongo connection
import connection from "./Database/connection.js";


// API
import items from "./API/items/index.js"
import images from "./API/photos/index.js"
import auth from "./API/auth/index.js"

// config files
import googleConfig from './config/google.config.js';
import privateRouteConfig from "./config/route.config.js";
import passport from 'passport';
const session = require('express-session');



//sessions
googleConfig(passport)
// privateRouteConfig(passport);

const myShop=express();


myShop.use(cors());             // cross-origin-resource-sharing
myShop.use(helmet());           // security gear in uncontrolled environment
myShop.use(express.json());
myShop.use(session({secret: 'ssshhhhh'}));
myShop.use(passport.initialize())


// routes
myShop.use("/items",items);
myShop.use("/images",images);
myShop.use("/auth",auth);



myShop.use(passport.session());

myShop.get("/", (req, res) => {
    return res.json({ Welcome: `to my my Shop backend software` });
  });

// server running
myShop.listen(process.env.Port ,()=>
{
    connection()
    .then(()=>
    {
        console.log("Server is running !!!");
    })
    .catch((error)=>
    {
        console.log("Server is running, but database connection failed...");
        console.log(error);
    })
})
