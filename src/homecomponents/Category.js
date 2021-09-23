import {NavLink} from 'react-router-dom'
import { useEffect ,useState} from "react"
import {useDispatch, useSelector} from 'react-redux';
import {getCategories} from "../store/categorySlice";
import axios from 'axios'
function Category(){
    let activeLinkStyles={
        color:'#40ff00',
        fontWeight:"bold"
      }
let {categories,categoryCount,isCategoryLoading}=useSelector(state=>state.category)
let dispatch=useDispatch()
useEffect(()=>{
   dispatch(getCategories())

},[])




    return(
        <div className="container-fluid">
            <h2 className="text-danger">Browse By Category</h2>
            {
            categories.map((category,index)=>{
                return(
                    <div key={index}>
                    <ul className="list-group">
                    <NavLink activeStyle={activeLinkStyles} className="nav-link" to={`/${category.category}`} aria-current="true">{category.category}</NavLink>

                    </ul>
                 </div>
                )
            })
        }
            </div>
    )
}
export default Category;