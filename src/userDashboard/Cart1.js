import React from 'react'
import UserDashboardSideBar from './UserDashboardSideBar'
import Cart from './Cart'
function Cart1(){
    return(
    <div className="container-fluid">
        <div className="row">
            <div className="col-3">
               <UserDashboardSideBar/>
            </div>
            <div className="col-9">
        
            <Cart/>
             </div>
        </div>
    </div>
    )
}
export default Cart1