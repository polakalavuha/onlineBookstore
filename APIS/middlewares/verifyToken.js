const jwt=require("jsonwebtoken")

require("dotenv").config()
const checkToken = (req, res, next) => {    
    //get token
    let token = req.headers.authorization.split(" ")[1]
    //if token is not existed
    if (token === "null") {
        throw new Error("Unathorized request..Please login to continue..")
    }
    
    const {username} =jwt.verify(token,process.env.SECRET)
    req.username=username;
    console.log("username",req.username)
     next();
            
 
}
module.exports=checkToken;