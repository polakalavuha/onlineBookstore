//create route obj
const express=require("express")
const cartApiObj=express.Router()
const expressAsyncHandler=require('express-async-handler')
//const multerObj=require("./middlewares/addImage")
const checkToken=require("./middlewares/verifyToken")
//body parser middleware
cartApiObj.use(express.json())
//get categoryCollection
let cartCollection;

cartApiObj.use((req,res,next)=>{
    cartCollection=req.app.get("cartCollection")
    next()
})
//post cart

cartApiObj.post('/addcart',checkToken,expressAsyncHandler(async(req,res)=>{
    let {books,quantity}=req.body;
    // console.log("cart books",books)
    let username=req.username;
    let userCart= await cartCollection.findOne({username})
    if(userCart){
     // Checking if book already exists - Inc qty if already exists
     if (JSON.stringify(userCart).includes(JSON.stringify(books))) {
        await cartCollection.updateOne({ "username":username, "cart.books": books }, { $inc: { "cart.$.quantity": quantity } })
    }
     // Adding to cart if not exists 
     else {
        await cartCollection.updateOne({ username }, { $push: { cart: { books, quantity } } })
    }
    }
// Inserting new cart if username doesn't exists
    else{
    await cartCollection.insertOne({ username, cart: [{books,quantity}] })
    
    }
    res.status(201).json({
        status: "success",
        message: "item added"
    })

}))




 // //get category
cartApiObj.get("/getcart",checkToken,expressAsyncHandler(async(req,res)=>{
    let username=req.username;
    let items=await cartCollection.findOne({username})
    //console.log(" cart items",items)
    res.status(200).json({
        status: "success",
        items: items.cart,
        cartUsername: items.username
    })
}))
//to update the quantity
cartApiObj.post("/updatequantity",checkToken,expressAsyncHandler(async(req,res)=>{
    let {books,quantity}=req.body;
    let username=req.username;
    await cartCollection.updateOne({ "username": username, "cart.books": books }, { $set: { "cart.$.quantity": quantity } })
    res.status(201).json({
        status: "success",
        message: "quantity updated"
    })
    
}))
//to delete the item in cart
cartApiObj.post("/deleteItem", checkToken, expressAsyncHandler(async (req, res) => {
    let { books } = req.body;
    let username = req.username;
    await cartCollection.updateOne({ username }, { $pull: { cart: { "books": books } } })
    res.status(200).json({
        status: "success",
        message: "item deleted"
    })
}))

module.exports=cartApiObj