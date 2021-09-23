//create mini-express app
const express=require("express")
const userApiObj=express.Router();
const expressAsyncHandler=require('express-async-handler')
const bcryptjs=require("bcryptjs")
const checkToken=require("./middlewares/verifyToken")
const jwt=require("jsonwebtoken")
const multerObj=require("./middlewares/addImage")
require("dotenv").config()
const ObjectId = require("mongodb").ObjectId
 const { decrypt, encrypt } = require("./helpers/encryption");
 const {sendMail}=require("./helpers/gmail")
//body parser middleware
userApiObj.use(express.json())
let userCollection;
let cartCollection;
//get usercollection object
userApiObj.use((req,res,next)=>{
    cartCollection=req.app.get("cartCollection")
    next()
})
userApiObj.use((req,res,next)=>{
    userCollection=req.app.get("userCollection")
    next()
})
//user registration
userApiObj.post('/register',expressAsyncHandler(async(req,res)=>{
    //get user from req.body
    //get userObj
    let newUser=req.body;
    // console.log("newUser",newUser)
    // Decrypting the user object
   
    
    
   
    //check for duplicate user
    let user=await userCollection.findOne({username:newUser.username})
    
    //if user existed send user already existed
    if(user)
    {
        res.send({message:"user is already existed"})
    }
    else{
        //hash password
        let hashedPassword=await bcryptjs.hash(newUser.password,6)
        //replace plain pw to hash pw
        newUser.password=hashedPassword
         // Specifying some defaults
        newUser.createdAt = new Date().toLocaleString()
        newUser.role = "user"
       
        newUser.status = "active"
        //insert userObj to usercollection
        await userCollection.insertOne(newUser)
        //send res
        res.send({message:"success"})

    }
}))

//user login
userApiObj.post('/login',expressAsyncHandler(async(req,res)=>{
    //get user crendentials
    let userCredentialsObj=req.body;
    
    userCredentialsObj = decrypt(userCredentialsObj.user)
    
    //find user by username
    let user=await userCollection.findOne({username:userCredentialsObj.username})
    //if user not existed
    if(!user)
    {
        res.send({message:"Invalid username"})
    }
    //if user is found
    else{
        //compare passwords
      let status= await bcryptjs.compare(userCredentialsObj.password,user.password)
      //if password is not matched
      if(status===false){
          res.send({message:"Invalid password"})
      }
      else{
          if(user.status==="blocked")
          {
              res.send({message:"Your account is blocked.contact admin to continue shopping"})
          }
          else{
        // Adding Current time
        await userCollection.updateOne({ username: user.username }, { $set: { lastLogin: new Date().toLocaleString() } }, { upsert: true })
          //create a token
        let signedToken= await jwt.sign({username:user.username},process.env.SECRET,{expiresIn:3000})
        user = encrypt(user)
        //send token in res
        res.send({message:"success",token:signedToken,user:user})
          }
      }
    }

}))
//to update the user

userApiObj.put("/update", checkToken, multerObj.single("profilePicture"), expressAsyncHandler(async (req, res) => {
   
    let user = JSON.parse(req.body.user)
    
    // Setting the profile picture if exists
    if (req.file) {
        user.profilePicture = req.file.path
    }
    // Checking if username is changed
    if (user.username !== user.cartUsername) {
        // Checking if username already exists
        const userDb = await userCollection.findOne({ username: user.username })
        if (userDb) {
            throw new Error("Username Already exists")
        }
        // If username is available changing the username in cart collection
        await cartCollection.updateOne({ username: user.cartUsername }, { $set: { username: user.username } })
    }
    // Getting the user id in var and deleting it from the obj for updation
    const userId = user._id
    delete user._id
   // console.log("user issss",user)
    delete user.cartUsername
    await userCollection.updateOne({ _id: new ObjectId(userId) }, { $set: user })
    // Again adding the user id
    user._id = userId
    // Encrypting the user
    userObj=user;
    user = JSON.stringify(user)
   // console.log("after user is",user)
    res.status(201).json({
        status: "success",
        message: "user updated",
        user:userObj
    })
}))
//get all users
userApiObj.get("/getAllUsers",checkToken,expressAsyncHandler(async(req,res)=>{
    
    let usersDb= await userCollection.find().toArray()
    //console.log("userDb",usersDb)
    res.status(200).json({
        status:"success",
        message:"user role updated",
        users:usersDb
    })
}))
// Update user role
userApiObj.put("/changeRole", checkToken, expressAsyncHandler(async (req, res) => {
    const user = req.body
    //console.log("user updated state",user)
    if (user.status) {
       if(user.status === "blocked")
        {
            sendMail(user,"Your Account is Blocked",`
            \rHi ${user.username},
            \rYour BookStore account is blocked.contact administrator to unblock and then you can continue your shopping,
             
            
            \rRegards,
            \rBookStore Admin
            `)
            
        }
        else{
            sendMail(user,"Your Account is unblocked",`
            \rHi ${user.username},
            \rYour BookStore account is unblocked. You can continue your shopping,
             
            
            \rRegards,
            \rBookStore Admin
            s`)
        }
        await userCollection.updateOne({ username: user.username }, { $set: { status: user.status } })
    }
    if (user.role) {
        await userCollection.updateOne({ username: user.username }, { $set: { role: user.role } })
    }
    res.status(200).json({
        status: "success",
        message: "user role updated"
    })
}))



module.exports=userApiObj