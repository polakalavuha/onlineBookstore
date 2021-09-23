import React from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { AiFillDelete} from 'react-icons/ai';
import { BiEdit} from 'react-icons/bi';
import {deleteCategory} from '../store/categorySlice'

function ViewCategory({ setShow, setUpdateIndex }){
let dispatch=useDispatch()
    const {categories}=useSelector(state=>state.category)
   
    return(
        <div className="container-fluid">
            <div className="pe-5 mt-4">
            <table className="table table-bordered ">
                <thead className="table-danger">
                    <tr className="text-center">
                        <th>S.no.</th>
                        <th>Category</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        categories ? 
                        
                        categories.map((category,index)=>(
                            
                            <tr key={index}>
                                    <td className="text-center">{index + 1}</td>
                                    <td>{category.category}</td>
                                    <td className="text-center">
                                        <span className="text-success cursor-pointer" onClick={() => { setShow(true); setUpdateIndex(index) }}><BiEdit/>

                                        </span>
                                        <span className="text-danger cursor-pointer" onClick={() => dispatch(deleteCategory({ category, index }))}><AiFillDelete/>

                                        </span>
                                    </td>
                            </tr>
                        )) :
                        <tr className="text-center"><td colSpan="3">No Records Found</td></tr>
                    }
                </tbody>
                </table>
                </div>
        </div>
    )
}
export default ViewCategory