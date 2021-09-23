import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from "axios"
 
// Get all books
export const getBooks = createAsyncThunk("getBooks", (async (_, thunkAPI) => {
    const { data } = await axios.get("/books/getbooks")
    //console.log("data is",data)
    if (data.message === "success") {
        return data
    } else {
        return thunkAPI.rejectWithValue(data)
    }
}))
// add books
export const insertBook = createAsyncThunk("insertBook", (async (bookObj, thunkAPI) => {
    const token = localStorage.getItem("token")
    const { data } = await axios.post("/books/addbooks",bookObj, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
   // console.log("data is",data)
    if (data.status === "success") {
        return data.book
    } else {
        return thunkAPI.rejectWithValue(data)
    }
}))
 // Delete Category
export const deleteBook = createAsyncThunk("deleteBook", (async ({ book, index }, thunkApi) => {
    const token = localStorage.getItem("token")
    const { data } = await axios.post("/books/removeBook", book, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
          // console.log("data is",data)
    if (data.status === "success") {
        return thunkApi.fulfillWithValue(index)
    } else {
        return thunkApi.rejectWithValue(data)
    }
}))
// Update a book
export const updateBook = createAsyncThunk("updateBook", async ({ formData, index }, thunkApi) => {
    const token = localStorage.getItem("token")
    const { data } = await axios.post("/books/editBook", formData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    console.log("data is",data)
    if (data.status) {
        return { book: data.book, index }
    } else {
        return thunkApi.rejectWithValue(data)
    }
})
// Initial State
const initialBooksState = {
    books: [],
    isBooksLoading: false,
    booksError: "",
    booksCount: 0,
    recentlyViewed:[]
}
 
// Slice
const booksSlice = createSlice({
    name: "books",
    initialState: initialBooksState,
    reducers: {
        
        addToRecentlyViewed:(state,action)=>{

            state.recentlyViewed.splice(0,0,action.payload)

        }
    },
    extraReducers: {
        // Get categories
        [getBooks.pending]: state => {
            state.isBooksLoading = true
            state.booksError = ""
        },
        [getBooks.fulfilled]: (state, action) => {
            state.isBooksLoading = false
            state.books = action.payload.payload
            state.booksCount = action.payload.payload.length
        },
        [getBooks.rejected]: (state, action) => {
            state.isBooksLoading = false
            state.booksError = action.payload.reason
        },
        [insertBook.pending]: state => {
            state.isBooksLoading = true
            state.booksError = ""
        },
        [insertBook.fulfilled]: (state, action) => {
            state.isBooksLoading = false
            state.books.push(action.payload)
           
        },
        [insertBook.rejected]: (state, action) => {
            state.isBooksLoading = false
            state.booksError = action.payload.reason
        },
        [deleteBook.pending]: state => {
            state.isBooksLoading = true
            state.booksError = ""
        },
        [deleteBook.fulfilled]: (state, action) => {
            state.isBooksLoading = false
            state.books.splice(action.payload, 1)
           
        },
        [deleteBook.rejected]: (state, action) => {
            state.isBooksLoading = false
            state.booksError = action.payload.reason
        },
        // Update book
        [updateBook.pending]: state => {
            state.isBooksLoading = true
            state.booksError = ""
        },
        [updateBook.fulfilled]: (state, action) => {
            state.isBooksLoading = false
            state.books.splice(action.payload.index, 1, action.payload.book)
        },
        [updateBook.rejected]: (state, action) => {
            state.isBooksLoading = false
            state.booksError = action.payload.reason
        },
 
    }
 
})
export const {addToRecentlyViewed}=booksSlice.actions

export default booksSlice.reducer