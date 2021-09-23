import React,{useState} from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import {useHistory,Link} from 'react-router-dom'
function Register(){
    let {register,handleSubmit,formState:{errors}}=useForm()
    let [userRegisterStatus,setUserRegisterStatus]=useState("");
    let [passwordMatch,setPasswordMatch]=useState();
    let history=useHistory()

    
    //     //when form submitted
     const onRegisterFormSubmit = async (userObj) => {
        //   userObj.role="user";
        //   userObj.address="";
        //   userObj.status="active";
        
        console.log("userObj",userObj)
        //make http post req
         if(userObj.password===userObj.conformpassword){
         delete userObj.conformpassword;
         
        let responseObj=await axios.post("/users/register",userObj)
        alert(responseObj.data.message)
        let payload = responseObj.data;
        if(payload.message==="success")
        {
            //redirect to login
            history.push("/login")
        }
        else{
            setUserRegisterStatus("Username has already taken")
        }
        }
        else{
            setPasswordMatch("Password does not match")
        }

        
    }
    return(
    <div className="container-fluid">
        <div className="row mt-5">
            {/* user register status */}
            <p className="display-2 text-center text-danger">{userRegisterStatus}</p>
            <p className="display-2 text-center text-danger">{passwordMatch}</p>
            <h3 className="text-center">Register</h3>
           <form className="col-11 col-sm-6 col-md-5 mx-auto" onSubmit={handleSubmit(onRegisterFormSubmit)}>
          
                    {/* username */}
                <div class="form-floating mb-3">
                    <input type="text" 
                    class="form-control" 
                    id="username" 
                    placeholder="name@example.com" 
                    {...register("username",{required:true,minLength:6,pattern: /^[A-Za-z]+$/i})}/>
                    <label for="username">Username</label>
               </div>
               {errors.username?.type==='required' && <p className="alert alert-danger">*UserName is required</p>}
               {errors.username?.type==='minLength' && <p className="alert alert-danger">*Minimum length should be 6</p>}
               {errors.username?.type==='pattern' && <p className="alert alert-danger">*It accepts only alphabets and spaces,no special characters</p>}
         
                 {/* name */}
               <div class="form-floating mb-3">
                   <input type="text" 
                    class="form-control" 
                    id="name" 
                    placeholder="name@example.com" 
                    {...register("name",{required:true,minLength:6,pattern: /^[A-Za-z]+$/i})}/>
                    <label for="name">Name</label>
                </div>
               {errors.name?.type==='required' && <p className="alert alert-danger">*UserName is required</p>}
               {errors.name?.type==='minLength' && <p className="alert alert-danger">*Minimum length should be 6</p>}
                       {/* password */}
                <div class="form-floating mb-3">
                    <input type="password" 
                    class="form-control" 
                    id="password" 
                    placeholder="name@example.com" 
                    {...register("password",{required:true,minLength:6})}/>
                    <label for="password">Password</label>
                </div>
               {errors.password?.type==='required' && <p className="alert alert-danger">*password is required</p>}
               {errors.username?.type==='minLength' && <p className="alert alert-danger">*Minimum length should be 6</p>}
               {errors.password?.type==='pattern' && <p className="alert alert-danger">*password is required</p>}
                  {/* confirm password */}
               <div class="form-floating mb-3">
                    <input type="password" 
                    class="form-control" 
                    id="conformpassword" 
                    placeholder="name@example.com" 
                    {...register("conformpassword",{required:true,minLength:6})}/>
                    <label for="conformpassword"> Confirm Password</label>
               </div>
               {errors.password?.type==='required' && <p className="alert alert-danger">*conform password is required</p>}
         

                  {/* email */}
               <div class="form-floating mb-3">
                  <input type="email" 
                   class="form-control" 
                   id="email" 
                   placeholder="name@example.com" 
                   {...register("email",{required:true,pattern:"[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"})}/>
                  <label for="email">Email</label>
                </div>
                {errors.email?.type==='required' && <p className="alert alert-danger">*Email is required</p>}
         
                        {/* dob */}
               <div class="form-floating mb-3">
                    <input type="date" 
                    class="form-control" 
                    id="dob" 
                    placeholder="name@example.com" 
                    {...register("dob",{required:true})}/>
                   <label for="dob">dob</label>
                </div>
                {errors.dob?.type==='required' && <p className="alert alert-danger">*Date of birth is required</p>}
          
                        {/* phonumber */}
                <div class="form-floating mb-3">
                    <input type="number" 
                    class="form-control" 
                    id="phonenumber" 
                    placeholder="name@example.com" 
                    {...register("phonenumber",{required:true})}/>
                   <label for="phonenumber">Phone No.</label>
               </div>
               {errors.phonenumber?.type==='required' && <p className="alert alert-danger">*Phone number is required</p>}
          
          
                <button className="btn btn-success d-block mx-auto">Register</button>
                <Link className="text-decoration-none text-danger space" to="/login">Already a user? Login</Link>
            </form>
        </div>
    </div>
    )
}
export default Register