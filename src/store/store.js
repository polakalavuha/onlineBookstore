import {configureStore} from '@reduxjs/toolkit'
import categorySlice from './categorySlice'
import booksSlice from './booksSlice'
import userSlice from './userSlice'
import cartSlice from './cartSlice'
import wishlistSlice from './wishlistSlice'
import errorSlice from './errorSlice'
export const store=configureStore({
    reducer:{
        books:booksSlice,
        category:categorySlice,
        user:userSlice,
        cart:cartSlice,
        wishlist:wishlistSlice,
       error:errorSlice
    }
})