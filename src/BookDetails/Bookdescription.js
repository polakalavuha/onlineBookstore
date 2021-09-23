import React,{useState,useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux'
import booksSlice from '../store/booksSlice'
import { useHistory } from 'react-router';
import BooksRightSide from './BooksRightSide'
import {addToRecentlyViewed} from '../store/booksSlice'
import { addItemToCart} from '../store/cartSlice';
import { addItemToWishlist } from '../store/wishlistSlice';
//import Quantity from '../userDashboard/Quantity';
const Bookdescription=({books})=>{
    let history=useHistory();
    const {wishlist}=useSelector(state=>state.wishlist)
    const {userObj,isSuccess}=useSelector(state=>state.user)
    let dispatch=useDispatch();
    let [quantity,setQuantity]=useState(1)
    const {recentlyViewed}=useSelector(state=>state.books)
    useEffect(() => {
        if(recentlyViewed.indexOf(books) === -1) {
            dispatch(addToRecentlyViewed(books))
        }
    }, [books]);

    
    return(

        <div className="container-fluid">
           <div className="row">
                <div className="col-12 col-sm-8 col-md-8">
                    <div class="row mb-2"> 
                        <div class="col-6 col-sm-3 col-md-3">
                           <div className="position-relative">
                               <img src={books.bookImage} className="img-fluid rounded-start" alt="books" />
                                {
                                books.discount >0 ?
                                <span className="position-absolute top-0 start-0 translate-middle badge rounded-circle bg-danger p-2">
                                {books.discount}% <br /> off
                                <span className="visually-hidden">discount</span>
                                </span>
                                : <span className="visually-hidden">discount</span>
                                }
                            </div>
                        </div>
                            {/* </span> */}
                        <div class="col-12 col-sm-3 col-md-3">
                            <h5 className="" style={{fontSize:"150%"}}><strong>{books.bookTitle}</strong></h5>
                            <p className="" style={{fontSize:"120%",margin:"0px",padding:"0px"}}><strong>Author: </strong>{books.author}</p>
                            <p className="" style={{fontSize:"120%",margin:"0px",padding:"0px"}}><strong>Publisher: </strong>{books.publisher}</p>
                            <p className="" style={{fontSize:"120%",margin:"0px",padding:"0px"}}><strong>  Discount: ₹</strong>{books.discount}<strong>%</strong></p>
                            { books.discount > 0 ?
                               <>
                                  <p className="text-decoration-line-through" style={{fontSize:"120%",margin:"0px",padding:"0px"}}><strong>Price: ₹</strong>{books.price}</p>
                                  <p className="" style={{fontSize:"120%",margin:"0px",padding:"0px"}}><strong>₹</strong>{(books.price)-((books.price)*(books.discount/100))}</p> 
                               </> :
                                  <p className="" style={{fontSize:"120%",margin:"0px",padding:"0px"}}><strong>Price: ₹</strong>{books.price}</p>
                             }
                        </div>
              
                       <div class="col-12 col-sm-4 col-md-6">
                          <h6 style={{fontSize:"120%",margin:"0px",padding:"0px"}} className="text-success"><strong>Available</strong></h6>
                          <p style={{fontSize:"120%",margin:"0px",padding:"0px"}}>Ships within 3-4 Days</p>
                           <p style={{fontSize:"120%",margin:"0px",padding:"0px"}}>₹50 shipping in India per item and low cost Worldwide</p>
                           <div><strong>Quantity:</strong></div>
                          <div className="input-group input-group-sm">
                          <div className="input-group-text cursor-pointer" onClick={() => quantity >= 2 && setQuantity(+quantity - 1)}>-</div>
                          <input type="text" style={{width:"20%"}} className="text-center" placeholder="Qty" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                          <div className="input-group-text cursor-pointer" onClick={() => quantity >= 1 && setQuantity(+quantity + 1)}>+</div>
                       </div>
                    
                        <div className="mt-2">
                            <button type="button" class="btn btn-danger "  onClick={()=>{!isSuccess ?  history.push("/login"):isSuccess && userObj.role==="user" ? dispatch(addItemToCart({books,quantity})) :alert("you are admin")}} style={{fontSize:"90%"}}><strong>Add Cart</strong></button>
                            <button type="button" class="btn btn-secondary ms-2"  onClick={()=> {!isSuccess ?  history.push("/login"):isSuccess && userObj.role==="user" ? !JSON.stringify(wishlist).includes(JSON.stringify(books)) && dispatch(addItemToWishlist({books})):alert("you are admin")}}  style={{fontSize:"90%"}}><strong>Add to Wishlist</strong></button>
                       </div>
                    </div> 
                </div>
                 <hr />
       
       
                <div className="row mt-2 col-12 col-sm-12 col-md-12">
                   <p className="fs-5" ><strong> Book Description:</strong>{books.description}</p>
                </div>
      
                <div className="row mt-2">
                       <div className=" col-6 col-sm-5 col-md-5 border-end">
                            <p className="" style={{fontSize:"120%",margin:"0px",padding:"0px"}}><strong>Author: </strong>{books.author}</p>
                            <p className="" style={{fontSize:"120%",margin:"0px",padding:"0px"}}><strong>Publisher: </strong>{books.publisher}</p>
                            <p className="" style={{fontSize:"120%",margin:"0px",padding:"0px"}}><strong>Price:₹</strong>{books.price}</p>
                            <p className="" style={{fontSize:"120%",margin:"0px",padding:"0px"}}><strong>RealeseDate</strong>{books.realeseDates}</p>
                        </div>
                        
                        <div className="col-6 col-sm-5 col-md-5">
                            <p className="" style={{fontSize:"120%",margin:"0px",padding:"0px"}}><strong>Language: </strong>{books.language}</p>
                            <p className="" style={{fontSize:"120%",margin:"0px",padding:"0px"}}><strong>Pages:</strong>{books.pages}</p>
                            <p className="" style={{fontSize:"120%",margin:"0px",padding:"0px"}}><strong>Rating:</strong>{books.rating}</p>
                            <p className="" style={{fontSize:"120%",margin:"0px",padding:"0px"}}><strong>Isbn</strong>{books.isbn}</p>
                        </div>
       
                 </div>
            </div>
            <div class=" border-start  col-md-4 col-lg-3">
                <BooksRightSide recentlyViewed={recentlyViewed}/>
            </div>
        </div>
    </div>
       
        
    );
    }
    export default Bookdescription