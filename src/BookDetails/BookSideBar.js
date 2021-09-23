import React from 'react';
import booksSlice from '../store/booksSlice'
import { useHistory } from 'react-router';
import SimilarBooks from './BooksRightSide';

const BookSideBar=({books})=>{
    let history=useHistory();
    return(
        
            
           <div className="container-fluid">
            
               <div className="card h-100 m-3 shadow " >
                    
                         {
                          books.discount >0 ?
                          <span className="position-absolute top-0 start-0 translate-middle badge rounded-circle bg-danger p-2" >
                           {books.discount}% <br /> off
                           <span className="visually-hidden">discount</span>
                           </span> 
                          : <span className="visually-hidden">discount</span>
                           }
                            
                    <div className="card-body">
                        <div onClick={() => history.push({ pathname: `/books/${books._id}`})}>
                            <img src={books.bookImage} alt="" width="100%"/>
                        </div>
                            <p style={{fontSize:"100%",margin:"0px",padding:"0px"}}><strong>Author:</strong>{books.author}</p>
                            <p style={{fontSize:"100%",margin:"0px",padding:"0px"}}><strong>Category:</strong>{books.category}</p>
                            <p className="text-decoration-line-through" style={{fontSize:"100%",margin:"0px",padding:"0px"}}><strong>Price: ₹</strong>{books.price}</p>
                             <p className="" style={{fontSize:"100%",margin:"0px",padding:"0px"}}><strong>₹</strong>{(books.price)-((books.price)*(books.discount/100))}</p> 
                                
                    </div>
               </div>
                    
                  

               
        
            </div>
    )
    }
    export default BookSideBar