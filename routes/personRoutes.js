import express from 'express';
import person from '../models/person.js';
// import { json } from 'body-parser';
import bodyParser from 'body-parser';
const router = express.Router();
import { generateToken, jwtAuthMiddleware } from '../jwt.js';

// post->create the data
// signup
router.post('/signup', async (req,res)=>{

    try{
       const data = req.body;             //data parser ->req.body have the data
       const newPerson = new person(data);        //craete a newPerson document using mongoose model
       const response = await newPerson.save();    //save the newPerson on database
       const payload = {
        id: response.id,
        username: response.username
       }
       const token = generateToken(payload);
       console.log("data saved and token genrated");
       res.status(200).json({response: response, token: token});
    }
    catch(err){
        console.log("error detected: ",err);
        res.status(500).json({error: 'internal server   Error'});
    }
})

// login

router.post('/login', async (req,res)=>{

    try{
        const {username,password} = req.body;
        const user = await person.findOne({username: username});
        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({error: 'invalid username or password'});
        }
        
        const payload = {
            id: user.id,
            username: user.username
        }
    
        const token = generateToken(payload);
        console.log("token generated: ",token);
        res.status(201).json(token);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'internal server error'});
    }
})

// profile of user

router.get('/profile',jwtAuthMiddleware, async(req,res)=>{

    try{
        const userData = req.user;
        const userId = userData.id;
        const user = await person.findById(userId);
        console.log("user found");
        res.status(200).json({user});

    }catch(err){
        console.log(err);
        res.status(401).json({error: "internal server error"});
    }
})

//put/patch-> update the data

router.put('/:id',async (req,res)=>{              // req-> http request and res-> http response
    try{
        const personId = req.params.id;     // extract the id from the url parameter
        const updatePersonData = req.body;   // updated data for the person

        const response = await person.findByIdAndUpdate(personId,updatePersonData,{   //find the data by personId and then update the data
            new: true,
            runValidators: true
        })
    
        if(!response){                                           //in cvase id is not found
            res.status(404).json({error: 'id is not found'});
        }

        console.log('data update succesfully');
        res.status(200).json(response);
    }catch(err){
        console.log("error: ",err);
        res.status(500).json({error: 'internal serverrr error'});
    }
})

// get->read the data
router.get('/',jwtAuthMiddleware,async (req,res)=>{
    try{
        const response = await person.find();
        console.log("data fetched");
        res.status(200).json(response);
    }
    catch(err){
        console.log("error detected: ",err);
        res.status(500).json({error: 'internal serverr Error'});    
    } 
})

// paramaterized API calls;

router.get('/:workType',async (req,res)=>{
    try{
        const worktype = req.params.workType;
        if(worktype=='web' || worktype=='dev' || worktype=='dsa' || worktype=='farm'){
            const response = await person.find({work:worktype});
            console.log("response generated");
            res.status(200).json(response);
        }
        else{
            res.status(404).json({error: 'invalid work type'});
        }
    }catch(err){
        console.log("error occured",err);
        res.status(500).json({error: 'internal server error'});
    }
})

//delete-> delete the data

router.delete('/:id', async (req,res)=>{
    try{
        const personId = req.params.id;     // get the id from the parameter
        
        const response = await person.findByIdAndDelete(personId); // assuming u have the person model
        console.log("tomar");
        if(!response){
            res.status(404),json({error: 'Person is not found'});
        }
        console.log('data deleted succesfully');
        res.status(200).json({message: 'data deleted succesfully'});

    }catch(err){
        console.log('error: ',err);
        res.status(500).json({error: 'internal server error'});
    }
})
export default router;