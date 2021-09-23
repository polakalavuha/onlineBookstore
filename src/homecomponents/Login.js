import {useEffect,useState} from 'react'
import {useForm} from 'react-hook-form'
import UserDashboard from '../userDashboard/UserDashboard'
//import {BiHomeAlt} from 'react-icons/bi'
import {MdSend} from 'react-icons/md'
import {useSelector,useDispatch} from 'react-redux'
import {userLogin} from '../store/userSlice'
import {useHistory} from 'react-router-dom'
import {encrypt} from '../helpers/encryption'
import {Link} from 'react-router-dom'

function Login(){

    let {register,handleSubmit,formState:{errors}}=useForm()
    let {userObj,isSuccess,isLoading,invalidLoginMessage}=useSelector(state=>state.user)
    let dispatch=useDispatch()
    let history=useHistory()
    
    let [userCredentialsObj,setUserCredentialsObj]=useState({
         
        username:"",
        password:""
    })
    function onLoginFormSubmit(userObj){
        setUserCredentialsObj({...userObj})
         userObj = encrypt(userObj)
        dispatch(userLogin(userObj))
        
    }
    
     
              useEffect(()=>{
             if(isSuccess && userObj.role==="user"){
                 //navigate to userdashboard
                 history.push("/")
             }
             if(isSuccess && userObj.role==="admin"){
                //navigate to userdashboard
                history.push(`/admindashboard/adminprofile`)
            }
         },[isSuccess])
    
     
    return(
       
        <div className="container-fluid">
        
            {invalidLoginMessage && <h1 className="text-center text-danger">{invalidLoginMessage}</h1>}
            <div className="row text-center mt-5">
                <div className="col-11 col-sm-8 col-md-6 mx-auto">
                    <div className="card w-75 mx-auto shadow mb-5">
                        <div className="card-body">
                            <h3 className="text-center">Login</h3>
                            <form className="" onSubmit={handleSubmit(onLoginFormSubmit)}>
                                {/* username */}
                                <div class="form-floating mb-3">
                                      <input type="text" 
                                      class="form-control" 
                                       id="username" 
                                       placeholder="name@example.com" 
                                      {...register("username",{required:true,minLength:5, pattern: /^[A-Za-z]+$/i })}/>
                                      <label for="username">Username</label>
                                </div>
                                        {errors.username?.type==='required' && <p className="alert alert-danger">*UserName is required</p>}
                                        {errors.username?.type==='minLength' && <p className="alert alert-danger">*Minimum length should be 5</p>}
                                        {errors.username?.type==='pattern'&& <p className="alert alert-danger">*It accepts only alphabets and spaces,no special characters</p>}

                                         {/* password */}
                                <div class="form-floating mb-3">
                                    <input type="password" 
                                    class="form-control" 
                                    id="password" 
                                    placeholder="name@example.com" 
                                    {...register("password",{required:true,minLength:5,pattern:"(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$"})}/>
                                    <label for="password">Password</label>
                                </div>
                                        {errors.password?.type==='required' && <p className="alert alert-danger">*password is required</p>}
                                        {errors.username?.type==='minLength' && <p className="alert alert-danger">*Minimum length should be 5</p>}
                                        {errors.password?.type==='pattern' && <p className="alert alert-danger">*minimum 8 chars and 1uppercase and 1 lowercase</p>}
           
                                 <button className="btn btn-success d-block mx-auto">Login<MdSend/></button>
                                 <Link className="text-decoration-none text-danger" to="/register">New User? Register</Link>
                            </form>
                       </div>
                   </div>
               </div>
           </div>
        </div>
       
    )

}
export default Login