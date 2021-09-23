import React,{useState,useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {useParams} from 'react-router'
//import _id from '../homecomponents/Category'
import BookTile from '../categoryListComponent/BookTile'
import Bookdescription from './Bookdescription'
import BooksRightSide from './BooksRightSide'
import SimilarBooks from './BooksRightSide'
import addRecentlyViewedBooks from "../store/booksSlice";

function BooksDetailsPage(){
    const {booksId}=useParams()

    const {books}=useSelector(state=>state.books)
   
   
    return(
        <div className="container-fluid">
            <div class="row">
                
                {/* main content */}
                <div class="col-12  mt-4 mb-5 ps-5">
                    {/* <div className="display-4 mt-5">{} Books</div> */}
                    {/* <div className="mt-3">{books.filter(books=>books._id === booksId).length} books found</div> */}
                        {
                        
                           books.filter(books=>books._id === booksId).map(books =>(
                              <Bookdescription books={books}/>
                       
                            ))
                        
                        }
                </div>
                    
             </div>
           
         </div>
           
    );

}
export default BooksDetailsPage;