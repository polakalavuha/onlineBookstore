import React,{useState,useEffect} from 'react'
import {BrowserRouter as Router,NavLink,useRouteMatch,Route,Switch} from 'react-router-dom'

import {CgProfile} from 'react-icons/cg';
import {MdLibraryBooks} from 'react-icons/md';
import {BiBorderAll} from 'react-icons/bi';
import {HiOutlineUsers} from 'react-icons/hi';

function AdminDashboardSideBar({url}){
    const [totalItems, setTotalItems] = useState(0);
    
   
   
    // Loading cart from db
  
    
    let activeLinkStyles={
        color:'#40ff00',
        fontWeight:"bold"
      }
   //let {path,url}=useRouteMatch();
    return(
       <div className="container-fluid">
            <h3>Dashboard</h3>
            <div>
                <NavLink activeStyle={activeLinkStyles} className="mb-2 text-decoration-none  ms-2" to={`${url}/adminprofile`}> <CgProfile/>Profile</NavLink>
            </div>
            <div>
                <NavLink activeStyle={activeLinkStyles} className="mb-2 text-decoration-none  ms-2" to={`${url}/categories`}>
                  <BiBorderAll/>  Categories
                                
                            </NavLink>
            </div>
            <div>
            <NavLink exact activeStyle={activeLinkStyles} className="mb-2 text-decoration-none  ms-2" to={`${url}/addBooks`}>
                          <MdLibraryBooks/>  Add Book
            </NavLink>
            </div>
            <div><NavLink exact activeStyle={activeLinkStyles}
                            className="mb-2 text-decoration-none  ms-2"
                            
                            to={`${url}/viewBooks`}>
                             <MdLibraryBooks/>View Books
                </NavLink></div>
            {/* <button className="btn btn-link list-unstyled-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapseBooks" >
                 <MdLibraryBooks/>  Books
           </button>
                    
            <div className="collapse ms-1" id="collapseBooks">
               <NavLink exact
                            className="nav-link text-dark  text-wrap"
                            activeStyle={activeLinkStyles}
                            to={`${url}/addBooks`}>
                            Add Book
                </NavLink>
                <NavLink exact
                            className="nav-link text-dark text-wrap"
                            activeStyle={activeLinkStyles}
                            to={`${url}/viewBooks`}>
                            View Books
                </NavLink>
            </div> */}
             <div>
                <NavLink activeStyle={activeLinkStyles} className="mb-2 text-decoration-none ms-2" to={`${url}/usermanagement`}>
                   <HiOutlineUsers/> Users
                                
                </NavLink>
           </div>
            
         
        </div>
           
        

    )
}
export default AdminDashboardSideBar