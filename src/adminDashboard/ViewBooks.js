import React from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {deleteBook} from '../store/booksSlice'
import {MdDelete} from 'react-icons/md';
import {FiEdit} from 'react-icons/fi';
import LoadSpinner from '../helpers/LoadSpinnner';
function ViewBooks({ setShow, setUpdateIndex }){
    const {books, isBooksLoading}=useSelector(state=>state.books)
let dispatch=useDispatch()
    return(
        <div className="container-fluid">
            
            <div className="mt-4">
            <div className="table-responsive">
            <table className="table table-bordered table-sm ">
                <thead className="table-danger">
                    <tr className="text-center">
                        <th>S.no.</th>
                        <th>BookImage</th>
                        <th>BookTitle</th>
                        <th>Price</th>
                        <th>Discount</th>
                        <th>Rating</th>
                        <th>Author</th>
                        <th>Publisher</th>
                        <th>Category</th>
                        <th>ReleaseDate</th>
                        <th>Description</th>
                        <th>Isbn</th>
                        <th>Pages</th>
                        <th>Language</th>
                        <th>Tag</th>
                        <th>Options</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        
                        
                        books.map((book,index)=>(
                            
                            <tr key={index}>
                                    <td className="text-center">{index + 1}</td>
                                    <td><img src={book.bookImage} width="100px" height="100px"/></td>
                                    <td>{book.bookTitle}</td>
                                    <td>{book.price}</td>
                                    <td>{book.discount}</td>
                                    <td>{book.rating}</td>
                                    <td>{book.author}</td>
                                    <td>{book.publisher}</td>
                                    <td>{book.category}</td>
                                    <td>{book.releaseDate}</td>
                                    <td>{book.description}</td>
                                     <td>{book.isbn}</td>
                                    <td>{book.pages}</td>
                                    <td>{book.language}</td>
                                    <td>{book.tag}</td>
                                    <td>
                                    <span className="text-success cursor-pointer" onClick={() => { setShow(true); setUpdateIndex(index) }}><FiEdit/></span>
                                        <span className="text-danger cursor-pointer" onClick={() => dispatch(deleteBook({ book,index }))}><MdDelete/></span>
                                        </td>
                                    
                            </tr>

                        ))
}
                </tbody>
                </table>
               
                </div>
        </div>
        </div>
    )
}
export default ViewBooks