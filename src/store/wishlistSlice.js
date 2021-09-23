import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
 export const addItemToWishlist=createAsyncThunk('addItemToWishlist',(async(books,thunkApi)=>{
    //make post
    const token = localStorage.getItem("token")
    const { data } = await axios.post("/wishlist/addwishlist", { books:books.books}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
   // console.log("add iteams in wishist",data)
    
    if (data.status === "success") {
        return thunkApi.fulfillWithValue(books)
    } else {
        return thunkApi.rejectWithValue(data)
    }
}) ) 
//to get the books of wishlist

export const loadWishlist = createAsyncThunk("loadWishlist", (async (_, thunkApi) => {
    const token = localStorage.getItem("token")
    const { data } = await axios.get("/wishlist/getwishlist",{
        
    headers: {
        Authorization: `Bearer ${token}`
    }
})
//console.log("get data in wishlist",data)
    if (data.status=== "success") {
        return data
    } else {
        return thunkApi.rejectWithValue(data)
    }
}))

//delete item from  wishlist

export const deleteWishlistItem=createAsyncThunk('deleteWishlistItem',(async({books,index},thunkApi)=>{
    const token = localStorage.getItem("token")
    const { data } = await axios.post("/wishlist/deleteItem", {books}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
   // console.log("delete data is",data)
    if (data.status === "success") {
        return thunkApi.fulfillWithValue(index)
    } else {
        return thunkApi.rejectWithValue(data)
    }
}) ) 


const initialWishlistState={
     wishlist:[],wishlistUsername:"",
         wishlistSuccess:false,
          wishlistLoading:false,
        wishlistError:false,
        
}
const wishlistSlice=createSlice({
    name:"wishlist",
    initialState:initialWishlistState,
        
    reducers:{
        resetWishlist: state => {
            state = initialWishlistState
            return state
        },
        setWishlistUsername: (state, action) => {
            state.wishlistUsername = action.payload
        }
    },
    extraReducers:{
        //for add the books
           [addItemToWishlist.fulfilled]:(state,action)=>{
           // console.log("addwishilist",action.payload)
            //console.log("addwishilist",action.payload.books)
            
            state.wishlist.push(action.payload.books);
           
            state.wishlistLoading=false;
            
            // state.cartCount++;
           },
           [addItemToWishlist.pending]:(state,action)=>{
            state.wishlistLoading=true;
           },
           [addItemToWishlist.rejected]:(state,action)=>{
           
            state.wishlistLoading=false;
            state.wishlistError = action.payload.reason
           },
        
        //      //to get the books
            [loadWishlist.fulfilled]:(state,action)=>{
                state.wishlist=action.payload.items;
                state.wishlistUsername = action.payload.wishlistUsername;
               
                state.wishlistLoading=false;
                
            },
            [loadWishlist.pending]:(state,action)=>{
                state.wishlistLoading=true;
                state.wishlistError=""
            },
            [loadWishlist.rejected]:(state,action)=>{
               
                state.wishlistLoading=false;
                state.wishlistError = action.payload.reason
    
            }, 
            
            //to delete te item
            [deleteWishlistItem.fulfilled]:(state,action)=>{
                state.wishlist.splice(action.payload,1)
               
                state.wishlistLoading=false;
                
               
    
    
            },
            [deleteWishlistItem.pending]:(state,action)=>{
                state.wishlistLoading=true;
                state.wishlistError=""
            },
            [deleteWishlistItem.rejected]:(state,action)=>{
               
                state.WishlistLoading=false;
                state.wishlistrror = action.payload.reason
    
            }, 


    }
})
export const {setWishlistUsername,resetWishlist} = wishlistSlice.actions
export default  wishlistSlice.reducer