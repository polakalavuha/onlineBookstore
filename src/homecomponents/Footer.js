import React from 'react'
import {AiFillFacebook} from 'react-icons/ai'
import {AiFillInstagram} from 'react-icons/ai'
import {AiFillTwitterCircle} from 'react-icons/ai'
function Footer(){
    return(
      <>
            <footer className="bg-dark text-white">
            <div className="row mt-5">
                <div className="col-sm-3 text-center">
                    <ul className="list-unstyled">
                        <li className="hovereffect">COMPANY</li>
                        <li className="hovereffect">About Us</li>
                        <li className="hovereffect">Career</li>
                        <li className="hovereffect">Blog</li>
                        <li className="hovereffect">Contact Us</li>

                    </ul>

                </div>
                <div className="col-sm-3 text-center">
                    <ul className="list-unstyled">
                        <li className="hovereffect">POLICIES</li>
                        <li className="hovereffect">Privacy Policies</li>
                        <li className="hovereffect">Terms Of Use</li>
                        <li className="hovereffect">Secure Shooping</li>
                        <li className="hovereffect">CopyRight Policy</li>
                    </ul>
                </div>
                <div className="col-sm-3 text-center">
                    <ul className="list-unstyled">
                        <li className="hovereffect">HELP</li>
                        <li className="hovereffect">Payment</li>
                        <li className="hovereffect">Shipping</li>
                        <li className="hovereffect">Return</li>
                        <li className="hovereffect">FAQ</li>
                    </ul>
                </div>
                <div className="col-sm-3 text-center">
                    <ul className="list-unstyled ">
                        <li className="hovereffect">MISC</li>
                        <li className="hovereffect">Affilate</li>
                        <li className="hovereffect">Request A Book</li>
                        <li className="hovereffect">SiteMap</li>
                        
                    </ul>
                </div>
                
            <hr/>
            <p className=" text-center hovereffect ">ADDRESS : SR Ecommerce Factory Pvt. Ltd., 2/14, ground floor , Ansari road , Daryaganj Delhi 110002 | Email: customerservice@bookswagon.com| Phone#: 011-41521153</p>
            <hr/>
            <p className="text-center hovereffect"  style={{fontSize:"150%"}}>Follow us on <AiFillFacebook/> <AiFillInstagram/> <AiFillTwitterCircle/></p>
            </div>
             <div className="row">
                    
             </div>
                
           
            
                
            
        </footer>
        </>
    )
}
export default Footer;