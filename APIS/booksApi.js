//create route obj
const express=require("express")
const booksApiObj=express.Router()
const expressAsyncHandler=require('express-async-handler')
const checkToken=require("./middlewares/verifyToken")
const multerObj=require("./middlewares/addImage")
const { ObjectId } = require("mongodb")
//body parser middleware
booksApiObj.use(express.json())
//get productCollection
let booksCollection;

booksApiObj.use((req,res,next)=>{
    booksCollection=req.app.get("booksCollection")
    
    
    next()
})
//get books
booksApiObj.get("/getbooks",expressAsyncHandler(async(req,res)=>{
    let books=await booksCollection.find().toArray()
    // console.log("books are",books)
    res.send({message:"success",payload:books})
}))
// // Add category
booksApiObj.post("/addbooks", checkToken,multerObj.single('bookImage'), expressAsyncHandler(async (req, res) => {
    const bookObj=JSON.parse(req.body.books)
    //add image CDN link to productObj
    bookObj.bookImage=req.file.path;
    console.log("new book is",bookObj)
    await booksCollection.insertOne(bookObj)
    res.status(201).json({
        status: "success",
        message: "book added",
        book:bookObj
    })
}))
// Delete book
booksApiObj.post("/removeBook", checkToken, expressAsyncHandler(async (req, res) => {
    const book= req.body
   // console.log("deleted category",category)
    await booksCollection.deleteOne({ isbn: book.isbn })
    res.status(200).json({
        status: "success",
        message: "book deleted"
    })
}))


// Update a book
booksApiObj.post("/editBook", checkToken, multerObj.single("bookImage"), expressAsyncHandler(async (req, res) => {
    const book = JSON.parse(req.body.books)
    console.log(" updated book is",book)
    if (req.file) {
        book.bookImage = req.file.path
    }
    const bookId = book._id
    delete book._id
    await booksCollection.updateOne({ _id: new ObjectId(bookId) }, { $set: book })
    book._id = bookId
    res.status(201).json({
        status: "success",
        message: "book added",
        book
    })
}))
module.exports=booksApiObj