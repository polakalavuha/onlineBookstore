import React,{useState,useEffect} from 'react'
import EditBook from './EditBook'
import {BrowserRouter as Router,Link,useHistory,useRouteMatch,Route,Switch} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import AdminDashboardSideBar from './AdminDashboardSideBar';
import { setUserObj } from '../store/userSlice';
import { decrypt } from '../helpers/encryption';
import { unAuthReqFallback } from '../helpers/unAuthReqFallback';
import AdminProfileData from './AdminProfileData'
import Categories from './Categories'
import AddBooks from './AddBooks'
import ViewBooks from './ViewBooks';
import UserManagement from './UserManagement';
import ResetAllState from '../helpers/ResetAllState';
import { setError } from '../store/errorSlice';


function AdminDashboard(){
    let {url,path}=useRouteMatch();
    const {userObj,isError}=useSelector(state=>state.user)
    const {booksError}=useSelector(state=>state.books)
    const { categoryError}=useSelector(state=>state.category)

    // console.log("uwishlistErrorrl before",url)
    const [show, setShow] = useState(false);
    const [updateIndex, setUpdateIndex] = useState(-1);
    const dispatch = useDispatch()
    const history = useHistory()
    // For session expired and token not available errors
    useEffect(() => {
        if (["jwt expired", "token not available"].indexOf(isError || booksError || categoryError) >= 0) {
            ResetAllState(dispatch)
            dispatch(setError("Session expired. Please login again."))
            history.push("/")
        }
    }, [isError, booksError, categoryError]);
     // For handling refresh and unauth access
     useEffect(() => {
        let storedUser = localStorage.getItem("user")
        try {
            storedUser = decrypt(storedUser)
        } catch (err) {
            unAuthReqFallback(dispatch, history)
        }
        const token = localStorage.getItem("token")
        if (storedUser && storedUser.role === "admin" && token) {
            if (!Object.keys(userObj).length) {
                dispatch(setUserObj(storedUser))
            }
        } else if (userObj.role !== "admin") {
            unAuthReqFallback(dispatch, history)
        }
    }, [userObj]);
    return(
    
    <div className="container-fluid">

        <div className="row">
            <div className=" col-12 col-md-3">
                <AdminDashboardSideBar url={url}/>
        
           </div>
    
            <div className="col-12 col-md-9">
                  <div className="border-start">
                      <Switch>
   
                          <Route exact path={`${path}/adminprofile`}>
                             <AdminProfileData />
                          </Route>
                           <Route exact path={`${path}/categories`}>
                              <Categories/>
                           </Route>
                            {/* Add Book Page  */}
                            <Route exact path={`${path}/addBooks`}>
                               <AddBooks/>
                            </Route>
                            {/* View Books Page */}
                            <Route exact path={`${path}/viewBooks`}>
                             <ViewBooks setShow={setShow} setUpdateIndex={setUpdateIndex}/>
                            </Route>
                            <Route exact path={`${path}/usermanagement`}>
                               <UserManagement/>
                             </Route>
               
                        </Switch> 
                    </div>
                </div>
                  {/* Edit Book Modal */}
                    <EditBook
                        show={show} setShow={setShow}
                        updateIndex={updateIndex} setUpdateIndex={setUpdateIndex}
                    />
    
   

        </div>
    </div>

    )
}
export default AdminDashboard