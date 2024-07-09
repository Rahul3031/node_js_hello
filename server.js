//SERVER
import express from 'express';
import db from './db.js';
import bodyParser from 'body-parser';
import personRoutes from './routes/personRoutes.js';
import dotenv from 'dotenv';

const app = express();

app.use(bodyParser.json()); //all data in json form from body come into "req.body"
app.use('/person',personRoutes);   //use the router

dotenv.config();
const PORT = process.env.PORT || 3000;

//API

// URL Path: Each "endpoint" has a unique path that specifies its location on the server. For example, /users, /products, or /api/v1/posts.
app.get('/',(req,res)=>{             //this is endpoint
    res.send("hi my name is rahul tomar");   
})

// app.get('/age',(req,res)=>{          //this is endpoint
//     res.send("i am 23");
// })

// app.get('/place',(req,res)=>{           //this is endpoint
//     res.send("i am from panipat haryana");
// })

// app.post('/item', (req,res)=>
// {
//     res.send("data is added succesful");
// })



app.listen(PORT,()=>{
    console.log("this app is listening on server 3000");
})

// In summary, endpoints define specific URLs with defined behaviors (HTTP methods) that clients can interact with to perform actions or retrieve data from a server.
//  APIs encompass the collection of endpoints and their documentation, providing a structured way for applications to communicate with each other over the web.