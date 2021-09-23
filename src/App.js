import React from 'react'
import {BrowserRouter,useRouteMatch,NavLink,useHistory,Route,Switch} from 'react-router-dom'
import HomeNavBar from './homecomponents/HomeNavBar';
import HomePage from './homecomponents/HomePage'
import Category from './homecomponents/Category';
import Footer from './homecomponents/Footer';
import BooksBasedCategory from './categoryListComponent/BooksBasedCategory';
import ContactUs from './homecomponents/ContactUs';
import Login from './homecomponents/Login'
import Register from './homecomponents/Register'
import SearchPage from './homecomponents/SearchPage';
import BookDetailsPage from './BookDetails/BookDetailsPage';
import UserDashboard from './userDashboard/UserDashboard'
import AdminDashboard from './adminDashboard/AdminDashboard'
import {setUserObj} from './store/userSlice'
import Cart from './userDashboard/Cart'

import Home from './homecomponents/Home';
import {useState,useEffect} from 'react'
import {loadCart} from './store/cartSlice'
import {useSelector,useDispatch} from 'react-redux'
import { decrypt } from "./helpers/encryption";
import Message from "./helpers/Message";
import { unAuthReqFallback } from "./helpers/unAuthReqFallback";
//import {getBooks} from './store/booksSlice'
//import {loadCart} from './store/cartSlice'
import {getBooks} from './store/booksSlice'
import {loadWishlist} from './store/wishlistSlice'
import {getCategories} from './store/categorySlice'
import ResetAllState from './helpers/ResetAllState'
import { setError } from './store/errorSlice';
import {getUsers} from './store/userSlice'

function App(){
    const {cart,cartError}=useSelector(state=>state.cart)
    const {books, booksError}=useSelector(state=>state.books)
    const {wishlist,wishlistError}=useSelector(state=>state.wishlist)
    const {userObj,allUsers,isError,isSuccess}=useSelector(state=>state.user)
    const {categoryError}=useSelector(state=>state.category)
    const { error } = useSelector(state => state.error)
    let [totalItems,setTotalItems]=useState(0);
    
    const dispatch = useDispatch()
    const history = useHistory()
    useEffect(() => {
        if (!cart.length && isSuccess) {
            
            dispatch(loadCart())
        }
    }, [userObj])
     // Loading all users from db
     useEffect(() => {
   
      if (!allUsers.length && isSuccess) {
          
        dispatch(getUsers())
      }
    }, [userObj])
    
    useEffect(()=>{

        dispatch(getBooks())
        
    },[])
    useEffect(()=>{
          if(wishlist.length<=0 && isSuccess){
          dispatch(loadWishlist())
          }
     },[userObj])
    useEffect(()=>{
      dispatch(getCategories())
            
     },[])
           //to handle session expired 
           // For session expired and token not available errors
  useEffect(() => {
    if (["jwt expired", "token not available"].indexOf(isError || cartError || wishlistError || booksError || categoryError) >= 0) {
      ResetAllState(dispatch)
      dispatch(setError("Session expired. Please login again."))
      history.push("/")
    }
  }, [isError, cartError, wishlistError, booksError, categoryError]);
        //to handle refresh and auth 
      useEffect(() => {
        let storedUser = localStorage.getItem("user")
        try {
          storedUser = decrypt(storedUser)
        } catch (err) {
          unAuthReqFallback(dispatch, history)
        }
        const token = localStorage.getItem("token")
        if (storedUser && token) {
          dispatch(setUserObj(storedUser))
        }
      }, []);
    return(
      <div>
        {/* <BrowserRouter> */}
        
        {
        error && <Message message={error} variant="danger" />
         }
            <HomeNavBar/>
            <Switch>
                <Route exact path="/">
                <HomePage/>
                </Route>
                <Route exact path="/home">
                <Home/>
                </Route>
                <Route exact path="/login">
                <Login/>
                </Route>
                <Route exact path="/register">
                <Register/>
                </Route>
                <Route exact path="/contactus">
                <ContactUs/>
                </Route>
                <Route path="/userdashboard">
                <UserDashboard/>
                </Route>
                <Route path="/admindashboard">
                <AdminDashboard/>
                </Route>
                
                <Route exact path="/cart">
                <Cart/>
                </Route>

                <Route exact path="/search">
                <SearchPage/>
                </Route>
                <Route exact path="/books/:booksId">
                <BookDetailsPage/>
                </Route>
                <Route exact path="/:category">
                <BooksBasedCategory/>
                </Route>
                

            </Switch>
            <Footer/>
        
        {/* </BrowserRouter> */}
        </div>
    )
}
export default App;