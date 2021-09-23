import React from 'react'
import {useSelector} from 'react-redux'
import {useParams} from 'react-router'
import Category from '../homecomponents/Category'
import BookTile from './BookTile'

function BooksBasedCategory(){
    const {category}=useParams()
    const {books}=useSelector(state=>state.books)
    console.log("books in database are",books)
    return(
        <div className="container-fluid">
            <div className="row">
                {/* category sidebar */}
                <div className="col-2 d-none d-sm-block">
                    <Category/>
                </div>
                {/* main content */}
                <div className="col-10 border-start mt-2 mb-2 ps-2">
                    <div className="display-4 mt-5">{category} Books</div>
                    <div className="mt-3 mb-5">{books.filter(books=>books.category === category).length} books found</div>
                        {
                        
                         books.filter(books=>books.category === category).map(books =>(
                            <BookTile books={books}/>
                           
                        ))
                        
                        }
                </div>
            </div>
           
        </div>
       
    );

}
export default BooksBasedCategory;