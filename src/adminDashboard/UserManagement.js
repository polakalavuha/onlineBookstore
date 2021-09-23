import React,{useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {getUsers} from '../store/userSlice'
import {updateRole} from '../store/userSlice'
import LoadSpinner from '../helpers/LoadSpinnner'
function UserManagement(){
    const {allUsers,userObj,isLoading,isSuccess}=useSelector(state=>state.user)
    let dispatch=useDispatch()
     // Loading all users from db
   useEffect(() => {
   
    if (!allUsers.length && isSuccess && userObj.role === "admin") {
        
      dispatch(getUsers())
    }
  }, [userObj])
  

  

  const toggleStatus = ({ user, index }) => {
      const userEdited = { username: user.username ,email:user.email }
      user.status === "active" ? userEdited.status = "blocked" : userEdited.status = "active"
      dispatch(updateRole({ user: userEdited, index }))
  }
  const toggleRole = ({ user, index }) => {
      const userEdited = { username: user.username,email:user.email}
      user.role === "user" ? userEdited.role = "admin" : userEdited.role = "user"
      dispatch(updateRole({ user: userEdited, index }))
  }

  return(
      <div>
          
            <div className="container-fluid">
            <div className="h4 mt-5">All Users</div>
            <div className="table-responsive">
                <table className="table table-bordered ">
                    <thead className="table-danger">
                        <tr className="text-center">
                            <th>S.no.</th>
                            <th>Name</th>
                            <th>Username</th>
                            <th>E-Mail</th>
                            <th>Phone</th>
                            <th>Role</th>
                            <th>Created At</th>
                            <th>Last Login</th>
                            <th>Status</th>
                            <th>Options</th>
                        </tr>
                    </thead> 
                    <tbody>
                        {
                            allUsers.map((user, index) => [
                                <tr key={index}>
                                    <td className="text-center">{index + 1}</td>
                                    <td>{user.name}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phonenumber || "-"}</td>
                                    <td>{user.role}</td>
                                    <td>{user.createdAt}</td>
                                    <td>{user.lastLogin}</td>
                                    <td>{user.status}</td>
                                    <td className="text-center">
                                        <span className="text-danger fw-bold cursor-pointer" onClick={() => toggleStatus({ user, index })}>{user.status === "active" ? "Block" : "Unblock"}</span>
                                        <span className="ms-3 text-danger fw-bold cursor-pointer" onClick={() => toggleRole({ user, index })}>{user.role === "user" ? "Make Admin" : "Make User"}</span>
                                    </td>
                                </tr>
                            ])
                        }
                        {
                            
                                !allUsers.length &&
                                <tr className="text-center"><td colSpan="12">No Records Found</td></tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
      </div>
  )
}
export default UserManagement