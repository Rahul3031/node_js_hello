import jwt from "jsonwebtoken";

export const jwtAuthMiddleware = async (req,res,next) => {
    
    const authorizatione = req.headers.authorization;
    if(!authorizatione) {
        console.log('token not found');
        return res.status(401).json({error: 'token not found'});
    }
    const token = req.headers.authorization.split(' ')[1];
    if(!token) res.status(401).json({error: 'unauthorized'});
    try{ 
        // verify the token with help of secret key and store the pay loader
        const decoded = await jwt.verify(token,process.env.SECRET_KEY);
        req.user = decoded;
        next();
    }catch(err){
        console.log(err);
        res.status(401).json({error: 'invalid token'});
    }
}

export const generateToken = (userData) => {
    // generate the jwt token with pay load
    return jwt.sign({userData},process.env.SECRET_KEY,{expiresIn: 30000});
}

export default jwtAuthMiddleware;