import React from 'react'
import UserDashboardSideBar from './UserDashboardSideBar'
 import ProfileData from './ProfileData'
function Profile(){
    return(
    <div className="container-fluid">
        <div className="row">
            <div className="col-3">
                 <UserDashboardSideBar/>
           </div>
            <div className="col-9">
               <ProfileData/>
            </div>
        </div>
    </div>
    )
}
export default Profile