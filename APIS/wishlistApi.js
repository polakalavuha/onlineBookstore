//create route obj
const express=require("express")
const wishlistApiObj=express.Router()
const expressAsyncHandler=require('express-async-handler')
//const multerObj=require("./middlewares/addImage")
const checkToken=require("./middlewares/verifyToken")
//body parser middleware
wishlistApiObj.use(express.json())
//get categoryCollection
let wishlistCollection;

wishlistApiObj.use((req,res,next)=>{
    wishlistCollection=req.app.get("wishlistCollection")
    next()
})
//post cart

wishlistApiObj.post('/addwishlist',checkToken,expressAsyncHandler(async(req,res)=>{
    let {books}=req.body;
     console.log("cart books",books)
    let username=req.username;
   
        await wishlistCollection.updateOne({ username }, { $addToSet: { wishlist: books } }, { upsert: true })
        res.status(201).json({
            status: "success",
            message: "item added"
        })

// Inserting new cart if username doesn't exists
    

}))




 // //get category
wishlistApiObj.get("/getwishlist",checkToken,expressAsyncHandler(async(req,res)=>{
    let username=req.username;
    let items=await wishlistCollection.findOne({username})
    console.log(" wihlist items",items)
    res.status(200).json({
        status: "success",
        items: items.wishlist,
        wishlistUsername: items.username
    })
}))

//to delete the item in cart
wishlistApiObj.post("/deleteItem", checkToken, expressAsyncHandler(async (req, res) => {
    let { books } = req.body;
    let username = req.username;
    await wishlistCollection.updateOne({ username }, { $pull: { wishlist: books } })
    res.status(200).json({
        status: "success",
        message: "item deleted"
    })
}))

module.exports=wishlistApiObj