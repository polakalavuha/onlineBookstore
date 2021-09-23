import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from "axios"
 
// Get All Categories
export const getCategories = createAsyncThunk("getCategories", (async (_, thunkApi) => {
    const { data } = await axios.get("/category/getcategory")
    //console.log("data is",data)
    if (data.message === "success") {
        return data
        
    } else {
        return thunkApi.rejectWithValue(data)
    }
}))
// // Add Category
export const addCategories = createAsyncThunk("addCategories", (async (category, thunkApi) => {
    const token = localStorage.getItem("token")
    const { data } = await axios.post("/category/addcategory", category, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    //console.log("data is",data)
    if (data.status === "success") {
        return thunkApi.fulfillWithValue(category)
    } else {
        return thunkApi.rejectWithValue(data)
    }
}))
// Delete Category
export const deleteCategory = createAsyncThunk("deleteCategory", (async ({ category, index }, thunkApi) => {
    const token = localStorage.getItem("token")
    const { data } = await axios.post("/category/removeCategory", category, {
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
// Update Category
export const updateCategory = createAsyncThunk("updateCategory", (async ({ category, index }, thunkApi) => {
    const token = localStorage.getItem("token")
    const { data } = await axios.post("/category/EditCategory", category, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    if (data.status === "success") {
        return thunkApi.fulfillWithValue({ category, index })
    } else {
        return thunkApi.rejectWithValue(data)
    }
}))
 
// Initial State
const initialCategoryState = {
    categories: [],
    isCategoryLoading: false,
    categoryError: "",
   
}
 
// Slice
const categorySlice = createSlice({
    name: "category",
    initialState: initialCategoryState,
    reducers: {
    },
    extraReducers: {
        // Get categories
        [getCategories.pending]: state => {
            state.isCategoryLoading = true
            state.categoryError = ""
        },
        [getCategories.fulfilled]: (state, action) => {
            state.isCategoryLoading = false
            state.categories = action.payload.payload
            
        },
        [getCategories.rejected]: (state, action) => {
            state.isCategoryLoading = false
            state.categoryError = action.payload.reason
        },
         // Add category
         [addCategories.pending]: state => {
            state.isCategoryLoading = true
            state.categoryError = ""
        },
        [addCategories.fulfilled]: (state, action) => {
            state.isCategoryLoading = false
            state.categories.push(action.payload)
        },
        [addCategories.rejected]: (state, action) => {
            state.isCategoryLoading = false
            state.categoryError = action.payload.reason
        },
        // Delete category
        [deleteCategory.pending]: state => {
            state.isCategoryLoading = true
            state.categoryError = ""
        },
        [deleteCategory.fulfilled]: (state, action) => {
            state.isCategoryLoading = false
            state.categories.splice(action.payload, 1)
        },
        [deleteCategory.rejected]: (state, action) => {
            state.isCategoryLoading = false
            state.categoryError = action.payload.reason
        },
        // Delete category
        [updateCategory.pending]: state => {
            state.isCategoryLoading = true
            state.categoryError = ""
        },
        [updateCategory.fulfilled]: (state, action) => {
            state.isCategoryLoading = false
            state.categories.splice(action.payload.index, 1,action.payload.category)
        },
        [updateCategory.rejected]: (state, action) => {
            state.isCategoryLoading = false
            state.categoryError = action.payload.reason
        }

 
    }
 
})
export default categorySlice.reducer