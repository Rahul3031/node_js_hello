import express from 'express';
import person from '../models/person.js';
// import { json } from 'body-parser';
import bodyParser from 'body-parser';
const router = express.Router();

// post->create the data
router.post('/', async (req,res)=>{

    try{
       const data = req.body;             //data parser ->req.body have the data
       const newPerson = new person(data);        //craete a newPerson document using mongoose model
       const response = await newPerson.save();    //save the newPerson on database
       console.log("data saved");
       res.status(200).json(response);
    }
    catch(err){
        console.log("error detected: ",err);
        res.status(500).json({error: 'internal server   Error'});
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
router.get('/',async (req,res)=>{
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