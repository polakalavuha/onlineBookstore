import {BrowserRouter,NavLink,Route,Switch} from 'react-router-dom'
import {clearLoginStatus} from '../store/userSlice'
import {useSelector,useDispatch} from 'react-redux'
import {FaCartArrowDown} from 'react-icons/fa';
import {ImBooks} from 'react-icons/im'
import {RiLoginCircleLine} from 'react-icons/ri';
import {AiTwotoneHome} from 'react-icons/ai';
import {AiFillDashboard} from 'react-icons/ai';
import { BiLogOutCircle} from 'react-icons/bi';
import { BsFillPersonPlusFill} from 'react-icons/bs';
import {useForm} from 'react-hook-form'
import {useHistory} from 'react-router-dom'
import ResetAllState from '../helpers/ResetAllState'
import defaultimage from '../media/defaultimage.png'
import {useState,useEffect} from 'react'
import {loadCart} from '../store/cartSlice'
function HomeNavBar() {
   const {cart}=useSelector(state=>state.cart)
   const {userObj,isSuccess}=useSelector(state=>state.user)
    
   const [totalItems,setTotalItems]=useState(0);
   
   useEffect(() => {
    if (cart.length) {
        setTotalItems(cart.map(item => +item.quantity).reduce((total, current) => total += current))
    }
    
    if (!cart.length) {
      setTotalItems(0)
    }
  }, [cart]);

  let {register,handleSubmit}=useForm();
  const history=useHistory()
  let activeLinkStyles={
    color:"#40ff00",
    fontWeight:"bold"
  }
//ghgg
 let dispatch=useDispatch()
  const onUserLogOut=()=>{
    //remove token from local storage
    
    ResetAllState(dispatch)
  }
  const onSearchFormSubmit=searchField=>{
    
    history.push(`/search?query=${searchField.searchQuery}`)
  }
  
  
  return (
    
  <>
      {/* navbar */}
    
       <nav className="navbar navbar-expand-sm navbar-dark bg-danger">
       <a className="navbar-brand ms-5 logo" href="#"><ImBooks/><span>Book Store</span></a>
    
      {/* collapsable button */}
     <button className="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
      </button>

         {/* menu */}
     <div className="collapse navbar-collapse" id="navbarSupportedContent">
        
        <ul className="navbar-nav ms-auto mb-lg-0">
          {!isSuccess ?
            <>
       
           <li className="nav-item">
              <NavLink activeStyle={activeLinkStyles} className="nav-link " to="/register"><BsFillPersonPlusFill/>Register</NavLink>
           </li>
           <li className="nav-item">
              <NavLink activeStyle={activeLinkStyles} className="nav-link " to="/login">Login<RiLoginCircleLine/></NavLink>
           </li>
           <li className="nav-item">
              <NavLink activeStyle={activeLinkStyles} className="nav-link " to="/contactus">ContactUs</NavLink>
           </li>
           <form className="d-flex me-5" onSubmit={handleSubmit(onSearchFormSubmit)}>
               <input type="search" name="searchQuery" placeholder="Search by Title,Author,Publisher or Isbn"
                {...register("searchQuery",{required:true})}/>
               <button type="submit"><i class="fa fa-search"></i></button>
           </form>
          </>
           :
        
         <>
              { userObj.role ==="user" ?
                <>
                <li className="nav-item">
                    <NavLink activeStyle={activeLinkStyles} className="nav-link " to="/home"><AiTwotoneHome/>Home</NavLink>
                </li> 
                 <li className="nav-item">
                     <NavLink activeStyle={activeLinkStyles} className="nav-link text-decoration-none position-relative" to="/cart"><FaCartArrowDown/>Cart <span class=" ms-2 badge bg-secondary">{totalItems}</span></NavLink>
                 </li>
                                 <li class="nav-item dropdown">
                                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        
                                          {
                                          userObj.name + " "
                                          }
                                          {
                                                userObj.profilePicture
                                                    ?
                                                    <img src={userObj.profilePicture} className="border border-dark rounded-circle" width="50px" alt="" />
                                                    :
                                                    <img src={defaultimage} className="border border-dark rounded-circle" width="50px" alt="" />
                                            }
                                        </a> 

                                        <ul class="dropdown-menu text-center" aria-labelledby="navbarDropdownMenuLink">
                                            <li className="nav-item" ><NavLink exact className="nav-link text-dark" to="/userdashboard/profile" ><AiFillDashboard/> Dashboard</NavLink></li>
                                            <li className="nav-item" ><NavLink exact className="nav-link text-dark" to="/" onClick={ onUserLogOut}><BiLogOutCircle/> Logout</NavLink></li>
                                        </ul>
                                    </li>
                              
       
                             </>:
                              <>
                                <li className="nav-item">
                                    <NavLink activeStyle={activeLinkStyles} className="nav-link " to="/Home"><AiTwotoneHome/>Home</NavLink>
                                     </li>
                                <li class="nav-item dropdown me-5">
                                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                       {
                                         userObj.name + " "
                                       }
                                        {
                                                userObj.profilePicture
                                                    ?
                                                    <img src={userObj.profilePicture} className="border border-dark rounded-circle" width="30px" alt="" />
                                                    :
                                                    <img src={defaultimage} className="border border-dark rounded-circle" width="0px" alt="" />
                                            }
                                        </a> 
                                        <ul class="dropdown-menu text-center" aria-labelledby="navbarDropdownMenuLink">
                                        <li className="nav-item" ><NavLink exact className="nav-link text-dark" to="/admindashboard/adminprofile" ><AiFillDashboard/> Dashboard</NavLink></li>
                                            <li className="nav-item" ><NavLink exact className="nav-link text-dark" to="/" onClick={ onUserLogOut}><BiLogOutCircle/> Logout</NavLink></li>
                                        </ul>
                                    </li>
                                   
                                  </>
                                }
                             </>
        
                  }
      
        </ul>
     
     
      </div>
    </nav>

  </>

  );
}

export default HomeNavBar;
