import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import person from "./models/person.js";

const localAuth = new LocalStrategy(async (USERNAME,password,done)=>{
    try{
        // console.log('received credentials',USERNAME,password);
        const user = await person.findOne({username: USERNAME});
        console.log(user);
        if(!user){
            return done(null,false,{message: 'incorrect username'});
        }
        const isPasswordmatch = await user.comparePassword(password);
        if(isPasswordmatch){
            return done(null,user);
        }else{
            return done(null,false,{message: 'incorrect password'}); 
        }
    }catch(err){
        return done(err);
    }
})
passport.use(localAuth);

export default passport;