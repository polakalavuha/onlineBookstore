import React,{useState,useEffect} from 'react'
import {BrowserRouter as Router,Link,useHistory,useRouteMatch,Route,Switch} from 'react-router-dom'
import Cart from './Cart'
import Profile from './Profile'
import WishList from './WishList'
import UserDashboardSideBar from './UserDashboardSideBar';
import ProfileData from './ProfileData'
import { setUserObj } from '../store/userSlice';
import { decrypt } from '../helpers/encryption';
import { useSelector,useDispatch } from 'react-redux'
import { unAuthReqFallback } from '../helpers/unAuthReqFallback';
import ResetAllState from '../helpers/ResetAllState';
import { setError } from '../store/errorSlice';
function UserDashboard(){
    let {path,url}=useRouteMatch();
   
    const {userObj,isError}=useSelector(state=>state.user)
    const {cartError}=useSelector(state=>state.cart)
    const { wishlistError}=useSelector(state=>state.wishlist)
    const dispatch = useDispatch()
    const history = useHistory()
    
    //console.log("url before",url)
     // For session expired and token not available errors
    useEffect(() => {
        if (["jwt expired", "Unathorized request..Please login to continue.."].indexOf(isError || cartError || wishlistError) >= 0) {
            ResetAllState(dispatch)
            dispatch(setError("Session expired. Please login again."))
            history.push("/")
        }
    }, [isError, cartError, wishlistError]);
    // For handling refresh and unauth access
    useEffect(() => {
        let storedUser = localStorage.getItem("user")
        const token = localStorage.getItem("token")
        try {
            storedUser = decrypt(storedUser)
        } catch (err) {
            unAuthReqFallback(dispatch, history)
        }
        if (storedUser && storedUser.role === "user" && token) {
            if (!Object.keys(userObj).length) {
                dispatch(setUserObj(storedUser))
            }
        } else if (userObj.role !== "user") {
            unAuthReqFallback(dispatch, history)
        }
    }, [userObj]);
    return(
    
    <div className="container-fluid">

    <div className="row">
        <div className="col-12 col-md-3">
            <UserDashboardSideBar url={url}/>
        
        </div>
    
        <div className="col-12 col-md-9">
            <div className="border-start">
                <Switch>
   
                    <Route exact path={`${path}/profile`}>
                       <ProfileData />
                    </Route>
                    <Route exact path={`${path}/cart`}>
                      <Cart/>
                    </Route>
                     <Route exact path={`${path}/wishlist`}>
                       <WishList />
                     </Route> 

        
                 </Switch> 
            </div>
       </div>
    
    
   

     </div>
</div>

    )
}
export default UserDashboard