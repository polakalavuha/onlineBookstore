import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import {decrypt} from '../helpers/encryption'
 export const userLogin=createAsyncThunk('loginUser',async(userCredentialsObj,thunkApi)=>{
    //make post
     let data;
    // //if type is user
    // if(userCredentialsObj.type==="user"){
    let response=await axios.post('/users/login',{user:userCredentialsObj})
     data=response.data;
    //console.log("data in userSlice",data)
    //console.log("userCredentials",userCredentialsObj)
    if(data.message==="success"){
        //save it in localstorage
        localStorage.setItem("token", data.token)
        localStorage.setItem("user", data.user)
        const decryptedUser = decrypt(data.user)
        //console.log("decryptuser",decryptedUser)
        return decryptedUser
    }
    if(data.message==="Invalid username" || data.message==="Invalid password" || data.message==="Your account is blocked.contact admin to continue shopping"){
        //it will provide data to rejected state
        return thunkApi.rejectWithValue(data)
    }

})
//to update user
// Update User
export const updateUser = createAsyncThunk("updateUser", async (formData, thunkApi) => {
    const token = localStorage.getItem("token")
    const { data } = await axios.put("/users/update", formData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    console.log("data is",data)
    if (data.status === "success") {
       
        return data.user
        
    } else {
        return thunkApi.rejectWithValue(data)
    }
})
// Get all users
export const getUsers = createAsyncThunk("getUsers", async (_, thunkApi) => {
    const token = localStorage.getItem("token")
    const { data } = await axios.get("/users/getAllUsers", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    console.log("data is",data)
    if (data.status === "success") {
        return data.users
    } else {
        return thunkApi.rejectWithValue(data)
    }
})
// Update user role
export const updateRole = createAsyncThunk("updateRole", async ({ user, index }, thunkAPI) => {
    
    const token = localStorage.getItem("token")
    const { data } = await axios.put("/users/changeRole", user, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    console.log("data is",data)
    if (data.status === "success") {
        return { user, index }
    } else {
        return thunkAPI.rejectWithValue(data)
    }
})
 export const initialUserState={
     userObj:{}, allUsers:[],
         isSuccess:false,
         isLoading:false,
         isError:false,
         invalidLoginMessage:''
}
const userSlice=createSlice({
    name:"user",
    initialState:initialUserState,
        
    reducers:{
        clearLoginStatus:(state)=>{
            state=initialUserState;
            return state;
        },
        setUserObj: (state, action) => {
            state.userObj = action.payload
            state.isSuccess = true
            return state
        }
    },
    extraReducers:{
        [userLogin.fulfilled]:(state,action)=>{
            state.userObj=action.payload;
            state.isSuccess=true;
            state.isLoading=false;
            state.invalidLoginMessage='';
            state.isError=false;


        },
        [userLogin.pending]:(state,action)=>{
            state.isLoading=true;
            state.isError = ""
        },
        [userLogin.rejected]:(state,action)=>{
            state.isError=true;
            state.isLoading=false;
            state.invalidLoginMessage=action.payload.message

        },
         // Update User
         [updateUser.pending]: (state, action) => {
            state.isError = ""
            state.isLoading = true
        },
        [updateUser.fulfilled]: (state, action) => {
           console.log("action payload",action.payload)
            console.log("action payload",action.payload.user)
            state.userObj = { ...state.userObj,...action.payload }
            console.log("stateuserObj",state.userObj)
            state.isUserLoading = false
            state.isError = ""
        },
        [updateUser.rejected]: (state, action) => {
            state.isLoading = false
            state.isError = action.payload.reason
        },
        // Update User
        [getUsers.pending]: (state, action) => {
            state.isError = ""
            state.isLoading = true
        },
        [getUsers.fulfilled]: (state, action) => {
            console.log("action.payload",action.payload)
            state.allUsers=action.payload 
            state.isUserLoading = false
            state.isError = ""
        },
        [getUsers.rejected]: (state, action) => {
            state.isLoading = false
            state.isError = action.payload.reason
        },
         // Update user role
         [updateRole.pending]: (state, action) => {
            state.userErrors = ""
            state.isUserLoading = true
        },
        [updateRole.fulfilled]: (state, action) => {
            state.isUserLoading = false
            action.payload.user.status
                ? state.allUsers[action.payload.index].status = action.payload.user.status
                : state.allUsers[action.payload.index].role = action.payload.user.role
        },
        [updateRole.rejected]: (state, action) => {
            state.isUserLoading = false
            state.userErrors = action.payload.reason
        },
    }
})
export const {clearLoginStatus,setUserObj}=userSlice.actions
export default userSlice.reducer