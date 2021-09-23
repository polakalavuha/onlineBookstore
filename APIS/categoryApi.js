//create route obj
const express=require("express")
const categoryApiObj=express.Router()
const expressAsyncHandler=require('express-async-handler')
const { ObjectId } = require("mongodb")
//const multerObj=require("./middlewares/addImage")
//const checkToken=require("./middlewares/VerifyToken")
const checkToken=require("./middlewares/verifyToken")
//body parser middleware
categoryApiObj.use(express.json())
//get categoryCollection
let categoryCollection;

categoryApiObj.use((req,res,next)=>{
    categoryCollection=req.app.get("categoryCollection")
    next()
})

//get category
categoryApiObj.get("/getcategory",expressAsyncHandler(async(req,res)=>{
    let category=await categoryCollection.find().toArray()
     console.log("category is",category)
    res.send({message:"success",payload:category})

}))

// // Add category
categoryApiObj.post("/addCategory", checkToken, expressAsyncHandler(async (req, res) => {
    const category = req.body
    console.log("new category is",category)
    await categoryCollection.insertOne(category)
    res.status(201).json({
        status: "success",
        message: "category added"
    })
}))
// Delete category
categoryApiObj.post("/removeCategory", checkToken, expressAsyncHandler(async (req, res) => {
    const category = req.body
   // console.log("deleted category",category)
    await categoryCollection.deleteOne({ category: category.category })
    res.status(200).json({
        status: "success",
        message: "category deleted"
    })
}))
// Edit category
categoryApiObj.post("/editCategory", checkToken, expressAsyncHandler(async (req, res) => {
    const category = req.body
    console.log("edited category",category)
    await categoryCollection.updateOne({ _id: new ObjectId(category._id) }, { $set: { category: category.category } })
    res.status(200).json({
        status: "success",
        message: "category updated"
    })
}))
module.exports=categoryApiObj