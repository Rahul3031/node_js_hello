import mongoose from "mongoose";

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
    }
})

// create person module
const person = mongoose.model('person',personSchema);
export default person;