//SERVER
import express from 'express';
import db from './db.js';
import bodyParser from 'body-parser';
import personRoutes from './routes/personRoutes.js';
import dotenv from 'dotenv';
import passport from './auth.js';

const app = express();

// MiddleWare-> it is riun btw the request and response in serial manner using next() function
const logRequest = (req,res,next) => {
    console.log(`${new Date().toLocaleString()} Request made to: ${req.originalUrl}`);
    next();
}


const localAuthMiddleware = passport.authenticate('local',{session: false});
app.use(passport.initialize());

// app.use-> MiddleWare
app.use(bodyParser.json()); //all data in json form from body come into "req.body"
app.use('/person',personRoutes);   //use the router
app.use(logRequest);  //used btw all the routes


dotenv.config();
const PORT = process.env.PORT || 3000;

//API

// URL Path: Each "endpoint" has a unique path that specifies its location on the server. For example, /users, /products, or /api/v1/posts.
app.get('/',(req,res)=>{             //this is endpoint
    res.send("hi my name is rahul tomar");   
})

//middleware can be used here or in btw routes too
// app.get('/',logRequest,(req,res)=>{             //this is endpoint
//     res.send("hi my name is rahul tomar");   
// })


app.listen(PORT,()=>{
    console.log("this app is listening on server 3000");
})

// In summary, endpoints define specific URLs with defined behaviors (HTTP methods) that clients can interact with to perform actions or retrieve data from a server.
//  APIs encompass the collection of endpoints and their documentation, providing a structured way for applications to communicate with each other over the web.