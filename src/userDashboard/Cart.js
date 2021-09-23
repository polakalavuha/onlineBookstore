import React,{useState,useEffect} from 'react';

import { Modal,Button } from 'react-bootstrap';
import {useSelector,useDispatch} from 'react-redux'
import {loadCart} from '../store/cartSlice'
import {updateQty} from '../store/cartSlice'
import { AiFillDelete } from 'react-icons/ai';
import { deleteCartItem } from '../store/cartSlice';
const Cart=()=>{
    let dispatch=useDispatch();
    let {cart}=useSelector(state=>state.cart)
    const {userObj,isSuccess}=useSelector(state=>state.user)
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    let [totalItems,setTotalItems]=useState(0);
    let [totalprice,setTotalPrice]=useState(0);
    let [discountprice,setDiscountPrice]=useState(0);
    console.log("cart items are",cart)
    
        useEffect(() => {
        if (cart.length) {
            setTotalItems(cart.map(item => +item.quantity).reduce((total, current) => total += current))
            setTotalPrice(cart.map(item => +((item.quantity)*item.books.price)).reduce((total,current)=>total+=current))
            setDiscountPrice(cart.map(item => +(item.quantity*((item.books.price)-((item.books.price)*(item.books.discount/100))))).reduce((total,current)=>total+=current))
        }
            if(!cart.length){
            setTotalItems(0);
            setDiscountPrice(0);
            setTotalPrice(0);
        }
        
    }, [cart]);
        //delete
        const deleteItem=(itemIndex)=>{
            dispatch(deleteCartItem(itemIndex))
        }
        //update the quantity
        const decreQtny = ({ cartItem, index }) => {
            
            let newCart = JSON.parse(JSON.stringify(cart))
            if (newCart[index].quantity === 1) {
                dispatch(deleteCartItem({ cartItem, index }))
            } else {
                newCart[index].quantity--
                dispatch(updateQty(newCart[index]))
            }
        }
        const increQtny = (index) => {
            let newCart = JSON.parse(JSON.stringify(cart))
            newCart[index].quantity++
            dispatch(updateQty(newCart[index]))
        }
    
    return(

    <div className="container-fluid">
        <div className="row">
            <div className="col-9">
               {
                cart.map((cartItem,index)=>{
               return(
                   <div class="row mt-2">
            
                       <div class="col-6 col-sm-3 col-md-2">
                          <img src={cartItem.books.bookImage} className="img-fluid rounded-start" alt="books" />
                         </div>
                        <div class="col-6 col-sm-3 col-md-3">
                           <h5 className="" style={{fontSize:"130%"}}><strong>{cartItem.books.bookTitle}</strong></h5>
                            <p className="" style={{fontSize:"110%",margin:"0px",padding:"0px"}}><strong>Author: </strong>{cartItem.books.author}</p>
                            <p className="" style={{fontSize:"100%",margin:"0px",padding:"0px"}}><strong>Publisher: </strong>{cartItem.books.publisher}</p>
                            <p className="" style={{fontSize:"100%",margin:"0px",padding:"0px"}}><strong>  Discount: ₹</strong>{cartItem.books.discount}<strong>%</strong></p>
                            { cartItem.books.discount > 0 ?
                               <>
                                <p className="text-decoration-line-through" style={{fontSize:"100%",margin:"0px",padding:"0px"}}><strong>Price: ₹</strong>{cartItem.books.price}</p>
                                <p className="" style={{fontSize:"100%",margin:"0px",padding:"0px"}}><strong>₹</strong>{(cartItem.books.price)-((cartItem.books.price)*(cartItem.books.discount/100))}</p> 
                               </> :
                                <p className="" style={{fontSize:"100%",margin:"0px",padding:"0px"}}><strong>Price: ₹</strong>{cartItem.books.price}</p>
                            }
                        </div>
                        <div class="col-12 col-sm-4 col-md-5">
                             <h6 style={{fontSize:"110%",margin:"0px",padding:"0px"}} className="text-success"><strong>Available</strong></h6>
                            <p style={{fontSize:"100%",margin:"0px",padding:"0px"}}>Ships within 3-4 Days</p>
                             <p style={{fontSize:"100%",margin:"0px",padding:"0px"}}>₹50 shipping in India per item and low cost Worldwide</p>
                            <div><strong>Quantity:</strong></div>
                           <div className="input-group input-group-sm">
                            <div className="input-group-text cursor-pointer" onClick={() =>decreQtny({cartItem,index})}>-</div>
                             <input type="text" style={{width:"20%"}} className="text-center" placeholder="Qty" value={cartItem.quantity}  />
                            <div className="input-group-text cursor-pointer" onClick={() =>increQtny(index)}>+</div>
                        </div>
                    </div>
                    <div className="col-12 col-sm-2 col-md-2 mt-1">
                        <button type="button" class="btn btn-danger" onClick={()=>deleteItem({cartItem,index})} style={{fontSize:"90%"}}><AiFillDelete/></button>
                        
                    </div>
               
                </div>
             )
             })
          } 
        </div>
            
        
         
                <div className=" col-12 col-md-3">
                       <div className="row mt-5">
                           <div className="card" style={{backgroundColor:"#FFA07A "}}>
                                <div className="card-body text-white" >
                                   <h2>Cart Summary</h2>
                                   <h6><strong className="text-secondary">Total Items:</strong>{totalItems}</h6>
                                   <h6><strong className="text-secondary">Total Price:</strong>{totalprice}</h6>
                                    <h6><strong className="text-secondary">Discount Price:</strong>{discountprice}</h6>
                                    <h6><strong className="text-secondary">Shipping charges:</strong>40</h6> 
                                    <h6><strong className="text-secondary">Net TotalPrice:</strong>{Math.round((discountprice+50))}</h6> 
                                    <h6><strong className="text-secondary">Your Savings:</strong>{Math.round((totalprice)-(discountprice))}</h6>
                                    {/* <button type="submit"  className="btn btn-success">CheckOut</button> */}
                                   
                                    <>
                                    <Button variant="primary" onClick={handleShow}>
                                              CheckOut
                                     </Button>

                                    <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Successfully Ordered</Modal.Title>
                                    </Modal.Header>
                                     <Modal.Body>Your order is conformed.Thank you and visit again</Modal.Body>
        
                                  </Modal>
                                   </>
                               </div>
                          </div>
                      </div>
                   </div>
                </div>
        
    


    </div>

       
        
       
      
        );
    }
    export default Cart