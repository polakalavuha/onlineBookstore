import React from 'react'
import {useForm} from 'react-hook-form'
import {addCategories} from '../store/categorySlice'
import {updateCategory} from '../store/categorySlice'
import {useDispatch,useSelector} from 'react-redux'
import LoadSpinner from '../helpers/LoadSpinnner'
function AddCategory({ updateIndex, setUpdateIndex, setShow }){
    const {categories,isCategoryLoading}=useSelector(state=>state.category)
    let {register,handleSubmit,formState: { errors }}=useForm({defaultValues: { ...categories[updateIndex] }})
    
    let dispatch=useDispatch()
    const formSubmit = category => {
        if (updateIndex >= 0) {
            dispatch(updateCategory({ category, index: updateIndex }))
            setUpdateIndex(-1)
            return setShow(false)
        }
        if (categories.findIndex(cat => cat.category === category.category) < 0) {
            dispatch(addCategories(category))
        }
       
    }
    return(
    <div className="container-fluid">
       <form onSubmit={handleSubmit(formSubmit)}>
           <div class="form-floating mb-3" >
                <input type="text" 
                class="form-control" 
                id="category" 
                placeholder="Category Name" 
                {...register("category",{required:true})}/>
                {errors.category?.type === "required" && <p className="alert alert-danger w-50 text-center mx-auto py-2 mt-2">Category Name is required</p>}
                 <label for="category">Category Name</label>
            </div>
               <div className="text-center mt-4 mb-5">
                   {
                      isCategoryLoading && <LoadSpinner message="Saving changes"/>
                   }
                        {
                           !updateIndex
                            ?
                            <button className="btn btn-danger mt-3" type="submit">Add</button>
                            :
                            <button className="btn btn-danger mt-3" type="submit">Update</button>
                        }
                </div>
        </form>
   </div>

    )
}
export default AddCategory