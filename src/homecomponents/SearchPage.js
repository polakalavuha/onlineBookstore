import React,{useState,useEffect} from 'react';
import {useSelector} from 'react-redux';
import BookTile from '../categoryListComponent/BookTile';
import Category from './Category';
import {useLocation} from 'react-router'
const useQuery = () => new URLSearchParams(useLocation().search)
const SearchPage=()=>{
    

    const query = useQuery().get("query").toLowerCase()
    //console.log("query is",query);


    const {books}=useSelector(state=>state.books)
    const [filteredBooks,setFilteredBooks]=useState([]);
    useEffect(()=>{
        setFilteredBooks(books.filter(books=>books.bookTitle.toLowerCase().includes(query)||
                                          books.author.toLowerCase().includes(query)||
                                          books.publisher.toLowerCase().includes(query)||
                                          books.isbn.toString().includes(query)))
    },[query]);
  return(
    <div className="container-fluid">
        <div className="row">
            {/* category sidebar */}
            <div className="col-2 d-none d-sm-block">
                <Category/>
            </div>
            {/* main content */}
            <div className="col-10 border-start mt-4 mb-5 ps-5">
                <div className="display-4 mt-5">Search Results for "{query}"</div>
                <div className="mt-3">{filteredBooks.length} books found</div>
                {
                filteredBooks.map(books=>(
                <BookTile books={books}/>
                ))}
                {
                    !filteredBooks.length && <div className="mt-5 fs-3">No books found.</div>
                }
            </div>
        </div>
    </div>
    )
}
export default SearchPage