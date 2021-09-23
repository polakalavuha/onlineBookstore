const exp=require("express")
const app=exp()
require("dotenv").config()
const path=require("path")

app.use(exp.static(path.join(__dirname,'./build')))

//import mongodb module
const mongoClient=require("mongodb").MongoClient;
//get database url
const dburl=process.env.DATABASE_URL;
//connect
mongoClient.connect(dburl,(err,client)=>{
    if(err){
        console.log("err in db connect",err)
    }
    else{
        //get obj of database
        let databaseObject=client.db('onlinebookstore')
        //get objects of collections
        let booksCollection=databaseObject.collection('booksCollection')
        let categoryCollection=databaseObject.collection('categoryCollection')
        let userCollection=databaseObject.collection('userCollection')
        let cartCollection=databaseObject.collection('cartCollection')
        let wishlistCollection=databaseObject.collection('wishlistCollection')
       
        //set to app object
        app.set("booksCollection",booksCollection)
        app.set("categoryCollection",categoryCollection)
        app.set("userCollection",userCollection)
        app.set("cartCollection",cartCollection)
        app.set("wishlistCollection",wishlistCollection)
       
       
        console.log("connected to db")
    }
})

//import apis objects
const booksApiObj=require("./APIS/booksApi")
const categoryApiObj=require("./APIS/categoryApi")
const userApiObj=require("./APIS/userApi")
const cartApiObj=require("./APIS/cartApi")
const wishlistApiObj=require("./APIS/wishlistApi")
app.use("/books",booksApiObj)
app.use("/category",categoryApiObj)
app.use("/users",userApiObj)
app.use("/cart",cartApiObj)
app.use("/wishlist",wishlistApiObj)
//error handling middleware
app.use((err,req,res,next)=>{
    res.send({message:"Error occured",reason:err.message})
})
//dealing with unmatched paths
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './build', 'index.html'))
})

//assign port
const PORT=process.env.PORT;
app.listen(PORT,()=>console.log(`server lisitening on port ${PORT}`))