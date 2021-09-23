import React,{useEffect} from 'react';


import {useSelector,useDispatch} from 'react-redux'
import {loadCart} from '../store/cartSlice'
import {loadWishlist} from '../store/wishlistSlice'
import { addItemToCart} from '../store/cartSlice';
import { AiFillDelete } from 'react-icons/ai';
import { deleteWishlistItem } from '../store/wishlistSlice';
const WishList=()=>{
   let dispatch=useDispatch();
    let {wishlist}=useSelector(state=>state.wishlist)
    const {userObj,isSuccess}=useSelector(state=>state.user)
    console.log("wishlist is",wishlist)

    useEffect(()=>{
        if(wishlist.length<=0 && isSuccess){
        dispatch(loadWishlist())
        }
        },[userObj])
       
        // //delete
        const deleteItem=(itemIndex)=>{
            dispatch(deleteWishlistItem(itemIndex))
        }
     const quantity=1;
    
    return(

        <>
    <div className="container-fluid">
           {
           wishlist.map((books,index)=>{
          return(
          
           <div className="">
                <div class="row mt-2 mb-2">
            
                    <div class="col-6 col-sm-3 col-md-2">
                         <img src={books.bookImage} className="img-fluid rounded-start" alt="books" />
                      </div>
                    <div class="col-6 col-sm-3 col-md-3">
                        <h5 className="" style={{fontSize:"130%"}}><strong>{books.bookTitle}</strong></h5>
                        <p className="" style={{fontSize:"110%",margin:"0px",padding:"0px"}}><strong>Author: </strong>{books.author}</p>
                        <p className="" style={{fontSize:"100%",margin:"0px",padding:"0px"}}><strong>Publisher: </strong>{books.publisher}</p>
                        <p className="text-decoration-line-through" style={{fontSize:"100%",margin:"0px",padding:"0px"}}><strong>Price: ₹</strong>{books.price}</p>
                        <p className="" style={{fontSize:"100%",margin:"0px",padding:"0px"}}><strong>₹</strong>{(books.price)-((books.price)*(books.discount/100))}</p> 
                    </div>
                    <div class="col-12 col-sm-4 col-md-5">
                        <h6 style={{fontSize:"110%",margin:"0px",padding:"0px"}} className="text-success"><strong>Available</strong></h6>
                        <p style={{fontSize:"100%",margin:"0px",padding:"0px"}}>Ships within 3-4 Days</p>
                       <p style={{fontSize:"100%",margin:"0px",padding:"0px"}}>₹50 shipping in India per item and low cost Worldwide</p>
                   
                
                    </div>
                     <div className="mt-2">
                         <button type="button" class="btn btn-danger " onClick={()=>dispatch(addItemToCart({books,quantity})) && deleteItem({books,index})} style={{fontSize:"90%"}}><strong>Add Cart</strong></button> 
                         <button type="button" class="btn btn-secondary ms-2"  onClick={()=>deleteItem({books,index})}  style={{fontSize:"90%"}}><strong>Delete from Wishlist</strong></button>
                    </div> 
               
                </div>
                
                 <hr />
            </div>
          )
          })
          }
    </div>

        </>
        );
    }
    export default WishList