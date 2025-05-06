import jwt from  'jsonwebtoken';


const auth = (req, res, next) => {
    const authHeader= req.headers.authorization;
    try{
        if(!authHeader || !authHeader.startsWith("Bearer")){
            return res.status(401).json({message:"Unauthorized"});
        }
        const token =authHeader.split(" ")[1];
        const decoded=jwt.verify(token, process.env.SECRET_KEY);

        req.user = {userId:decoded.userId};
        next();
    }
    catch(error){
        console.log("Auth error:", error);
        res.status(403).json({message: "Invalid or expired token"});
    }
};

export default auth;