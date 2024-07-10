import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    work: {
        type: String,
        enum: ["dsa","web","dev","farm"],
        required: true
    },
    username: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    }
})

// adding bycrption in password
// pre->middleware function

personSchema.pre('save', async function (next) {
    
    const person = this;
    //check if password is already modified or not
    // console.log(this);
    if(!person.isModified('password')) return next();
    

    try{
        //hash password generation
        const salt = await bcrypt.genSalt(10);
        // hash password
        const hashedPassword = await bcrypt.hash(person.password,salt);
        person.password = hashedPassword;
        return next();
    }catch(err){
        return next(err);
    }

})

// campare password ->we use comparepasword method of mongoose

personSchema.methods.comparePassword = async function(candidatePassword){
    
    const person = this;
    try{
        const isMatch = await bcrypt.compare(candidatePassword,person.password);
        return isMatch;
    }catch(err){
        throw err;
    }
} 

// create person module
const person = mongoose.model('person',personSchema);
export default person