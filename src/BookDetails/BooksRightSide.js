import React from 'react'
import { useState,useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import BookSideBar from './BookSideBar'
import BooksSideBarStip from './BooksSideBarStip'

//import SimilarBooks from './BooksSideBarStip';
function BooksRightSide({recentlyViewed}){
    const {books}=useSelector(state=>state.books)
    const {booksId}=useParams()
    const [similarBooks,setSimilarBooks]=useState([])
    useEffect(() => {
        const currentBook = books.find(books => books._id === booksId)
        setSimilarBooks(books.filter(books => (
            books.category === currentBook.category &&
            books._id !== booksId
        )).slice(0, 2))
    }, [booksId]);
    return(

        
        <div className="container-fluid    mt-2">
                    {/* similar books */}
                <BooksSideBarStip books={similarBooks} title="similarBooks"/>
                 {/* Recently Viewed Books */}
               <BooksSideBarStip title="Recently Viewed" books={recentlyViewed.slice(0,2)} />
        </div>
                   
                    
                    
                    
                
        
        
    )
} 
export default BooksRightSide