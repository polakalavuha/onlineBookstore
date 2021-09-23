import React,{useState} from 'react'
import {useForm} from 'react-hook-form'
import {insertBook} from '../store/booksSlice'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {updateBook} from '../store/booksSlice'
import sampleBookimage from '../media/sampleBookimage.png'
import LoadSpinner from '../helpers/LoadSpinnner'
function AddBooks({ updateIndex, setUpdateIndex, setShow }){
  const {categories}=useSelector(state=>state.category)
  const {books,isBooksLoading}=useSelector(state=>state.books)

    let {register,handleSubmit,reset,watch,formState:{errors}}=useForm({
         defaultValues: { ...books[updateIndex],bookImage:"" 
         }})
         
         const watchBookImage = watch("bookImage", [])
         let dispatch=useDispatch();
         let[file,setFile]=useState(null);
  
   
        //when form submitted
        const onBookFormSubmit = async (bookObj) => {
          //create FOrmData obj
           let formData = new FormData();
            //for updating book
           if(updateIndex>=0){
             // If new book image is given add it in the form data else use the old link
            if (bookObj.bookImage) {
                formData.append('bookImage',bookObj.bookImage[0],bookObj.bookImage[0].name)
            } else {
                bookObj.bookImage = books[updateIndex].bookImage
            }
            // Adding book in form data
            formData.append('books', JSON.stringify(bookObj))
            // Dispatching update action
            dispatch(updateBook({ formData, index: updateIndex }))
            // Making updateIndex and show back to default
            setUpdateIndex(-1)
            setShow(false)
            }
            //adding the book image to form data
            else{
            //append image to it
            formData.append('bookImage', bookObj.bookImage[0],bookObj.bookImage[0].name)
            //append productObj
            formData.append('books', JSON.stringify(bookObj))
              //  dispatch(addBook(formData))
            dispatch(insertBook(formData))
            reset()
            }
        }
    
          //after image selected
           const onFileSelect = (e) => {
              setFile(e.target.files[0])
            }
    return(
       <div className="container-fluid">
           <div className="row mt-5">
           
           
              <form className="" onSubmit={handleSubmit(onBookFormSubmit)} >
                    <div className="row mb-3 ms-1 me-2">
                        <div className="col-md-6">
          
                            <div className="form-group mb-3 align-items-center">
                                <label htmlFor="bookImage" className="cursor-pointer">
                                    {
                                        watchBookImage.length !== 0 ?
                                        <span className="ms-5 mb-3 card p-1">
                                            <img src={URL.createObjectURL(watchBookImage[0])} width="100px" height="110px" alt="" />
                                        </span>
                                        : updateIndex < 0 || updateIndex === undefined
                                            ?
                                            <span className="ms-5 mb-3 card p-1">
                                                <img src={sampleBookimage} width="100px" height="110px" alt="" />
                                            </span>
                                            :
                                            <span className="ms-5 mb-3 card p-1">
                                                <img src={books[updateIndex].bookImage} width="100px" height="110px" alt="" />
                                            </span>
                                    }

                                </label>
                                <label htmlFor="bookImage">
                                    <div className="text-danger fw-bold cursor-pointer ms-5">
                                           Choose Book Image
                                     </div>
                                </label>
                                {
                                   (updateIndex < 0 || updateIndex === undefined)
                                    ?
                                    <input
                                        type="file" className="d-none" accept="image/*"
                                        id="bookImage" placeholder="#" name="bookImage"
                                        {...register("bookImage", { required: true })} />
                                    :
                                    <input
                                        type="file" className="d-none" accept="image/*"
                                        id="bookImage" placeholder="#" name="bookImage"
                                        {...register("bookImage")} />
                                }
                            </div>
                           {errors.bookImage?.type === "required" && <p className="text-danger mt-1">Book Image is required</p>}

                   
                        </div>
                       {/* bookTitle */}
                        <div className="col-md-6">
                        
                           <div class="form-floating">
                                  <input type="text" 
                                   class="form-control" 
                                   id="bookTitle" 
                                   placeholder="name@example.com" 
                                   {...register("bookTitle",{required:true})}/>
                                   <label for="bookTitle">Book Title</label>
                           </div>
                               {errors.bookTitle?.type==='required' && <p className="alert alert-danger">*BookTitle is required</p>}

                        </div>
                    </div>
             {/* Author */}
                       <div className="row ms-1 mb-3 me-2">
                            <div className="col-md-6">
          
                                <div class="form-floating">
                                     <input type="text" class="form-control" id="author" 
                                     placeholder="name@example.com"  
                                     {...register("author",{required:true})}/>
                                      <label for="author">Author</label>
                                </div>
                                  {errors.author?.type==='required' && <p className="alert alert-danger">*Author is required</p>}

                            </div>
                               {/* publisher */}
                             <div className="col-md-6">
                    
                                    <div class="form-floating">
                                         <input type="text" 
                                            class="form-control" 
                                            id="publisher" 
                                            placeholder="name@example.com" 
                                            {...register("publisher",{required:true})}/>
                                             <label for="publisher">Publisher</label>
                                    </div>
                                        {errors.publisher?.type==='required' && <p className="alert alert-danger">*Publisher is required</p>}

                                </div>
                        </div>

             {/* rating*/}
                            <div className="row ms-1 mb-3 me-2">
                                <div className="col-md-6">
          
                                    <div class="form-floating">
                                         <input type="text" class="form-control" id="rating"  
                                         placeholder="name@example.com" 
                                         {...register("rating",{required:true})}/>
                                         <label for="rating">Rating</label>
                                    </div>
                                    {errors.rating?.type==='required' && <p className="alert alert-danger">*Rating is required</p>}

                                </div>
                                   {/* price*/}
                                <div className="col-md-6">
                   
                                    <div class="form-floating">
                                        <input type="number" 
                                         class="form-control" 
                                         id="price" 
                                         placeholder="name@example.com" 
                                        {...register("price",{required:true})}/>
                                        <label for="price">Price</label>
                                    </div>
                                    {errors.price?.type==='required' && <p className="alert alert-danger">*Price is required</p>}

                                </div>
                            </div>
                            {/* release date*/}
                            <div className="row ms-1 mb-3 me-2">
                                <div className="col-md-6">
          
                                    <div class="form-floating">
                                          <input type="date" class="form-control" id="releaseDate" 
                                           placeholder="name@example.com"  
                                            {...register("releaseDate",{required:true})}/>
                                           <label for="releaseDate">ReleaseDate</label>
                                    </div>
                                    {errors.releaseDate?.type==='required' && <p className="alert alert-danger">*ReleaseDate is required</p>}

                                </div>
                                         {/* description*/}
                                  
                                <div className="col-md-6">
                                    <div class="form-floating">
                                        <input type="text" 
                                        class="form-control"         
                                        id="description" 
                                         placeholder="name@example.com" 
                                         {...register("description",{required:true})}/>
                                         <label for="description">Description</label>
                                    </div>
                                     {errors.description?.type==='required' && <p className="alert alert-danger">*Description is required</p>}

                                 </div>
                            </div>
                                    {/* Category */}
                            <div className="row ms-1 mb-3 me-2">
                                <div className="col-md-6">
                                    <div className="form-floating">

                                       <select class="form-select" aria-label="Default select example" id="floatingInput" placeholder="#" name="category" {...register("category", { required: true })}>

                                            <option disabled>-- Category --</option>

                                            {

                                               categories.map((category,index)=>{
                                                    return(
                                                       <option value={category.category}>{category.category}</option>

                                                    )

                                                })

                                            }

                                        </select>

                                        {errors.category?.type === "required" && <p className="alert alert-danger w-50 text-center mx-auto py-2 mt-2">Category is required</p>}

                                         <label for="floatingInput">Category</label>

                                   </div>
                               </div>
                                  {/* isbn*/}
                               <div className="col-md-6">
                   
                                   <div class="form-floating">
                                     <input type="number" 
                                      class="form-control" 
                                     id="isbn" 
                                     placeholder="name@example.com" 
                                     {...register("isbn",{required:true})}/>
                                     <label for="isbn">Isbn</label>
                                   </div>
                                  {errors.isbn?.type==='required' && <p className="alert alert-danger">*Isbn is required</p>}

                              </div>
                            </div>
            {/* pages*/}
                               <div className="row ms-1 mb-3 me-2">
                                  <div className="col-md-6">
                                       <div class="form-floating">
                                               <input type="number" class="form-control" id="pages"
                                               placeholder="name@example.com"   
                                               {...register("pages",{required:true})}/>
                                               <label for="pages">Pages</label>
                                        </div>
                                        {errors.pages?.type==='required' && <p className="alert alert-danger">*Pages is required</p>}

                                     </div>
            {/* discount*/}
                                   <div className="col-md-6">
                    
                                      <div class="form-floating">
                                           <input type="number" 
                                           class="form-control" 
                                           id="discount" 
                                           placeholder="name@example.com" 
                                           {...register("discount",{required:true})}/>
                                           <label for="discount">Discount</label>
                                        </div>
                                        {errors.discount?.type==='required' && <p className="alert alert-danger">*Discount is required</p>}

                                    </div>
                                </div>
                                <div className="row ms-1 mb-3 me-2">
                                    <div className="col-md-6">
                                      <div class="form-floating ">
                                          <input type="text" 
                                          class="form-control" 
                                          id="language" 
                                          placeholder="name@example.com" 
                                          {...register("language",{required:true})}/>
                                          <label for="language">Language</label>
                                      </div>
                                       {errors.language?.type==='required' && <p className="alert alert-danger">*Language is required</p>}
                                    </div>
                              
                               <div className="col-md-6">
                                    <div class="form-floating ">
                                        <select class="form-select" aria-label="Default select example" id="floatingInput" placeholder="#" name="tag" {...register("tag", { required: true })}>

                                          <option disabled>-- Tags --</option>

                                          <option value="featured">featured</option>
                                          <option value="awardwinner">awardwinner</option>

                                       </select>
                                      
                                       
                                         {errors.tag?.type==='required' && <p className="alert alert-danger">*Tag is required</p>}
                                         <label for="floatingInput">Tags</label>
                                    </div>
                                </div>
                               </div>
          
                        <div className="text-center mt-4 mb-2">
                            {
                            isBooksLoading && <LoadSpinner message="loading the page"/>
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
        </div>
    )
}
export default AddBooks