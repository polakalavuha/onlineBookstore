import React,{useState,useEffect} from 'react'
import {useForm} from 'react-hook-form'
import { useDispatch,useSelector } from 'react-redux'
import defaultimage from '../media/defaultimage.png'
import {setCartUsername } from '../store/cartSlice';
import {updateUser} from '../store/userSlice';
import LoadSpinner from '../helpers/LoadSpinnner';
function AdminProfileData(){
    let {userObj,isLoading,isError,isSuccess}=useSelector(state=>state.user)
    let {cartUsername}=useSelector(state=>state.cart)
    let [file,setFile]=useState(null)
    const { register, handleSubmit,setValue} = useForm({
        defaultValues: {
            ...userObj
           
            
        }
    })
    useEffect(() => {
        if (userObj) {
            setValue("name", userObj.name)
            setValue("username",userObj.username)
            setValue("email", userObj.email)
            setValue('address',userObj.address)
            setValue("phonenumber", userObj.phonenumber)
        }
    }, [userObj]);
    const dispatch = useDispatch()

    useEffect(() => {
        if (userObj.username !== cartUsername) {
            dispatch(setCartUsername(userObj.username))
        }
    }, [userObj.username]);
    

    const updatedFormSubmit = EditedData => {
        console.log("edited data",EditedData)
        //Creating formData object
        const formData = new FormData()

        // Appending image to it
        if (file) {
            formData.append("profilePicture", file, file.name)
        }

        // Appending userObj
        EditedData._id = userObj._id
        EditedData.cartUsername = cartUsername;
        EditedData=JSON.stringify(EditedData)
        formData.append("user",EditedData)

        dispatch(updateUser(formData))
       
    }
    const onFileSelect = (event) => {
        setFile(event.target.files[0])
    }
    return(
        
      <div className="container-fluid">
           <div className="row">
               <div className="col-12 col-md-8 ps-5 border-end">
                     <p className="h3">Welcome Admin {userObj.username}</p>
                     <p className="h4 text-center">Edit your profile</p>
                     <p className="text-success">{ isSuccess}</p>
                        <div className="text-center mt-4">
                            {
                                file
                                    ? <img src={URL.createObjectURL(file)} className="border border-dark rounded-circle" width="200px" alt="" />
                                    : userObj.profilePicture
                                        ?
                                        <img src={userObj.profilePicture} className="border border-dark rounded-circle" width="200px" alt="" />
                                        :
                                        <img src={defaultimage} className="border border-dark rounded-circle" width="200px" alt="" />
                            }
                        </div>
                        <div className="">
                            <form className="mt-4 mx-auto " onSubmit={handleSubmit(updatedFormSubmit)}>
                                <div className="row justify-content-center">
                                    {/* Profile Picture */}
                                    <div className="text-center mb-3">
                                        <label htmlFor="profilePicture" id="profilePictureLabel" className="text-danger cursor-pointer fw-bold">Change Profile Picture</label>
                                        <input
                                            type="file" className="d-none"
                                            accept="image/*" name="profilePicture"
                                            id="profilePicture" onChange={onFileSelect} />
                                    </div>
                                </div>
                                <div className="row">    
                                    <div className="col-5">
                                            {/* username */}
                                        <div class="form-floating mb-3">
                                            <input type="text" 
                                             class="form-control" 
                                             id="name" 
                                             placeholder="name@example.com" 
                                            {...register("name",{required:true})}/>
                                             <label for="name">Name</label>
                                        </div>
         

                                     </div>
                                     <div className="col-5">
                                         {/* email */}
                                        <div class="form-floating mb-3">
                                            <input type="email" 
                                             class="form-control" 
                                             id="email" 
                                              placeholder="name@example.com" 
                                             {...register("email",{required:true})}/>
                                             <label for="email">Email</label>
                                        </div>
           
                                    </div>
                               </div>
                                <div className="row">
                                    <div className="col-5">
                                              {/* username */}
                                        <div class="form-floating mb-3">
                                        <input type="text" 
                                        class="form-control" 
                                        id="username" 
                                        placeholder="name@example.com" 
                                        {...register("username",{required:true})}/>
                                         <label for="username">UserName</label>
                                     </div>
          

                                </div>
                                <div className="col-5">
                              
                          
                                    <div class="form-floating mb-3">
                                         <input type="text" 
                                         class="form-control" 
                                         id="address" 
                                         placeholder="Address(optional)" 
                                         {...register("address",{required:true})}/>
                                         <label for="address">Address</label>
         
    
                                    </div>
           

                                </div>
                          
                                </div>
                                   <div className="row">
                                        <div className="col-10 text-center">
                                           <p className=" text text-danger mx-auto">{isError}</p>
                                           {/* {
                                           isLoading && <LoadSpinner message="Saving Changes"/>
                                           } */}
                                           <button className="btn btn-danger mx-auto" type="submit">Save</button>
                                   
                                       </div>
                              
                                    </div>
                            </form>
                  
             
                        </div>
                </div>       
          </div>
      </div>
      
    )
}
export default AdminProfileData