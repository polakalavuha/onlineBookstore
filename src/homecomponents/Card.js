import { useEffect ,useState} from "react"
import {useDispatch, useSelector} from 'react-redux';
import {getBooks} from "../store/booksSlice";
import {useHistory} from 'react-router-dom'
import axios from 'axios'
import { addItemToCart } from "../store/cartSlice";
function Card(){

let {books,booksCount,isBooksLoading}=useSelector(state=>state.books)

let dispatch=useDispatch()
let history=useHistory();
     useEffect(()=>{
         dispatch(getBooks())

      },[])


return(
        <div className="container-fluid">
           <h3 className='mt-2 text-danger'> Featured Books For you</h3> 
              <div className=" row row-cols-2 row-cols-md-5 g-5  mt-2">
                 {
                   books.filter(books => books.tag==="featured").slice(0,5)
                  .map((books,index)=>{
                  return(
                    
                    <div className="col" key={index}>
                     
                      <div className="card h-100 shadow " >
                          {
                          books.discount >0 ?
                          <span className="position-absolute top-0 start-0 translate-middle badge rounded-circle bg-danger p-2" >
                           {books.discount}% <br /> off
                           <span className="visually-hidden">discount</span>
                           </span> 
                          : <span className="visually-hidden">discount</span>
                           }
    
                        <div className="card-body" key={index}>
                            <div  onClick={() => history.push({ pathname: `/books/${books._id}`})}>
                                 <img src={books.bookImage} className="img-fluid rounded-start" alt=""/>
                            </div>
                                <p style={{fontSize:"100%",margin:"0px",padding:"0px"}}><strong>Author:</strong>{books.author}</p>
                                <p style={{fontSize:"100%",margin:"0px",padding:"0px"}}><strong>Category:</strong>{books.category}</p>
                                { books.discount > 0 ?
                                <>
                                <p className="text-decoration-line-through" style={{fontSize:"100%",margin:"0px",padding:"0px"}}><strong>Price: ₹</strong>{books.price}</p>
                                <p className="" style={{fontSize:"100%",margin:"0px",padding:"0px"}}><strong>₹</strong>{(books.price)-((books.price)*(books.discount/100))}</p> 
                                </> :
                                <p className="" style={{fontSize:"100%",margin:"0px",padding:"0px"}}><strong>Price: ₹</strong>{books.price}</p>
                                }
                        </div>
                      </div>
                   </div>

                   )
                   }) 
                   }
              
              </div>

               
          </div>
        
        
      
     
     ) 
    
}
export default Card;