import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
 export const addItemToCart=createAsyncThunk('addItemToCart',(async(booksQuantity,thunkApi)=>{
    //make post
    const token = localStorage.getItem("token")
    const { data } = await axios.post("/cart/addcart", { books:booksQuantity.books,quantity:booksQuantity.quantity}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    console.log("error data is",data)
    if (data.status === "success") {
        return thunkApi.fulfillWithValue(booksQuantity)
    } else {
        return thunkApi.rejectWithValue(data)
    }
}) ) 
//to get the books of cart

export const loadCart = createAsyncThunk("loadCart", (async (_, thunkApi) => {
    const token = localStorage.getItem("token")
    const { data } = await axios.get("/cart/getcart",{
    headers: {
        Authorization: `Bearer ${token}`
    }
})
    
    if (data.status=== "success") {
        return data
    } else {
        return thunkApi.rejectWithValue(data)
    }
}))
//update the cart quantity
export const updateQty=createAsyncThunk('updateQty',(async(booksQuantity,thunkApi)=>{
const token = localStorage.getItem("token")
const { data } = await axios.post("/cart/updatequantity", { books:booksQuantity.books,quantity:booksQuantity.quantity}, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})

if (data.status === "success") {
    return thunkApi.fulfillWithValue(booksQuantity)
} else {
    return thunkApi.rejectWithValue(data)
}
}) ) 
//delete item from cart

export const deleteCartItem=createAsyncThunk('deleteCartItem',(async(cartItemIndex,thunkApi)=>{
    const token = localStorage.getItem("token")
    const { data } = await axios.post("/cart/deleteItem", { books: cartItemIndex.cartItem.books}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    console.log("delete data is",data)
    if (data.status === "success") {
        return thunkApi.fulfillWithValue(cartItemIndex.index)
    } else {
        return thunkApi.rejectWithValue(data)
    }
    }) ) 


const initialCartState={
     cart:[],cartUsername:"",
         cartSuccess:false,
          cartLoading:false,
         cartError:false, 
}
const cartSlice=createSlice({
    name:"cart",
    initialState:initialCartState,
        
    reducers:{
        resetCart: state => {
            state = initialCartState
            return state
        },
        setCartUsername: (state, action) => {
            state.cartUsername = action.payload
        }
    },
    extraReducers:{
        //for add the books
            [addItemToCart.fulfilled]:(state,action)=>{
            
           
                state.cartLoading=false;
                const index = state.cart.findIndex(booksQuantity=> JSON.stringify(booksQuantity.books) === JSON.stringify(action.payload.books))
                index >= 0 ? state.cart[index]["quantity"] += action.payload.quantity : state.cart.push(action.payload)
            
           
             },
            [addItemToCart.pending]:(state,action)=>{
               state.cartLoading=true;
            },
            [addItemToCart.rejected]:(state,action)=>{
           
                state.cartLoading=false;
                state.cartError = action.payload.reason
            },
        
        //      //to get the books
            [loadCart.fulfilled]:(state,action)=>{
                state.cart=action.payload.items;
                state.cartUsername = action.payload.cartUsername;
               
                state.cartLoading=false;
                
               
    
    
            },
            [loadCart.pending]:(state,action)=>{
                state.cartLoading=true;
                state.cartError=""
            },
            [loadCart.rejected]:(state,action)=>{
               
                state.cartLoading=false;
                state.cartError = action.payload.reason
    
            }, 
            //to updtae the quantity
            [updateQty.fulfilled]: (state, action) => {
                state.cartLoading = false
                state.cart
                    .find(booksQuantity =>
                        JSON.stringify(booksQuantity.books) === JSON.stringify(action.payload.books)
                    )["quantity"] = action.payload.quantity
            },
            [updateQty.pending]:(state,action)=>{
                state.cartLoading=true;
            },
            [updateQty.rejected]:(state,action)=>{
               
                state.cartLoading=false;
                state.cartError = action.payload.reason
            },
            //to delete te item
            [deleteCartItem.fulfilled]:(state,action)=>{
                state.cart.splice(action.payload,1)
               
                state.cartLoading=false;
                
               
    
    
            },
            [deleteCartItem.pending]:(state,action)=>{
                state.cartLoading=true;
                state.cartError=""
            },
            [deleteCartItem.rejected]:(state,action)=>{
               
                state.cartLoading=false;
                state.cartError = action.payload.reason
    
            }, 


    }
})
export const {setCartUsername,resetCart } = cartSlice.actions
export default  cartSlice.reducer