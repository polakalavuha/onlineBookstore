import React from 'react';
import booksSlice from '../store/booksSlice'
import { useHistory } from 'react-router';
import { addItemToCart} from '../store/cartSlice';
import {useDispatch} from 'react-redux'
const BookTile=({books})=>{
    let history=useHistory();
    let dispatch=useDispatch()
    
    return(

        <>
    <div className="container-fluid">
       <div onClick={() => history.push({ pathname: `/books/${books._id}`})}>
            <div class="row mb-2">
                           
                <div class="col-6 col-sm-4 col-md-2">
                   <div className="position-relative">
                      <img src={books.bookImage} alt="" width="115px" />
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
                <div class="col-6 col-sm-3 col-md-3">
                    <h5 className="" style={{fontSize:"130%"}}><strong>{books.bookTitle}</strong></h5>
                    <p className="" style={{fontSize:"110%",margin:"0px",padding:"0px"}}><strong>Author: </strong>{books.author}</p>
                    <p className="" style={{fontSize:"100%",margin:"0px",padding:"0px"}}><strong>Publisher: </strong>{books.publisher}</p>
                    <p className="" style={{fontSize:"100%",margin:"0px",padding:"0px"}}><strong>Discount:</strong>{books.discount}<strong>%</strong></p>
                     { books.discount > 0 ?
                               <>
                                <p className="text-decoration-line-through" style={{fontSize:"100%",margin:"0px",padding:"0px"}}><strong>Price: ₹</strong>{books.price}</p>
                                <p className="" style={{fontSize:"100%",margin:"0px",padding:"0px"}}><strong>₹</strong>{(books.price)-((books.price)*(books.discount/100))}</p> 
                               </> :
                                <p className="" style={{fontSize:"100%",margin:"0px",padding:"0px"}}><strong>Price: ₹</strong>{books.price}</p>
                     }
                </div>
                <div class="col-12 col-sm-5 col-md-7">
                    <h6 style={{fontSize:"110%",margin:"0px",padding:"0px"}} className="text-success"><strong>Available</strong></h6>
                    <p style={{fontSize:"100%",margin:"0px",padding:"0px"}}>Ships within 3-4 Days</p>
                    <p style={{fontSize:"100%",margin:"0px",padding:"0px"}}>₹50 shipping in India per item and low cost Worldwide</p>
                    
                </div>
            </div>
            <hr />
        
        </div>
    </div>
        
        </>
        );
    }
    export default BookTile