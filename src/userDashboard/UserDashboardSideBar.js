import React,{useState,useEffect} from 'react'
import {BrowserRouter as Router,NavLink,useRouteMatch,Route,Switch} from 'react-router-dom'
import Cart from './Cart'
import Profile from './Profile'
import WishList from './WishList'
import {useDispatch, useSelector} from 'react-redux'
import {loadCart} from '../store/cartSlice'
import {loadWishlist} from '../store/wishlistSlice'
import {CgProfile} from 'react-icons/cg';
import {HiShoppingCart} from 'react-icons/hi';
import {RiShoppingCartLine} from 'react-icons/ri';
function UserDashboardSideBar({url}){
    const [totalItems, setTotalItems] = useState(0);
    const { cart} = useSelector(state => state.cart)
    const {userObj, isSuccess}=useSelector(state=>state.user)
    const {wishlist}=useSelector(state=>state.wishlist)
    console.log("wishlistlength",wishlist.length)
    let dispatch=useDispatch();
    // Loading cart from db
 
    useEffect(() => {
        if (cart.length) {
            setTotalItems(cart.map(item => +item.quantity).reduce((total, current) => total += current))
        }
        if (!cart.length) {
            setTotalItems(0)
        }
    }, [cart]);
    //for wishlist count
    useEffect(()=>{
        if(wishlist.length<=0){
        dispatch(loadWishlist())
        }
        },[])
    // console.log("cart length",cart)
    let activeLinkStyles={
        color:'#40ff00',
        fontWeight:"bold",
    
      }
  
    return(
       <div className="container-fluid">
            <div>
                <NavLink activeStyle={activeLinkStyles} className="" to={`${url}/profile`}><CgProfile/>Profile</NavLink>
            </div>
            <div>
                <NavLink activeStyle={activeLinkStyles} className="" to={`${url}/cart`}>
                                <HiShoppingCart/> Cart
                                <span class=" ms-3 badge bg-secondary">
                                    {totalItems}
                                
                                </span></NavLink>
            </div>
            
            <div>
                <NavLink activeStyle={activeLinkStyles}  className="" to={`${url}/wishlist`}>
                <RiShoppingCartLine/> WishList
                               <span class=" ms-3 badge bg-secondary">
                                   {wishlist.length}
                                </span></NavLink>
            </div>
         
        </div>
           
        

    )
}
export default UserDashboardSideBar