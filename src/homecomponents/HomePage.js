import React from 'react'
import HomeNavBar from './HomeNavBar'
import Caurosel from './Caurosel'
import Footer from './Footer'
import Category from './Category'
import Card from './Card'
import {useSelector} from 'react-redux'
import AwardWinner from './AwardWinner'
import LoadSpinner from '../helpers/LoadSpinnner'
function HomePage(){
    const {isBooksLoading}=useSelector(state=>state.books)
    return(
    <div className="container-fluid">
             
        <div className="row">
               <div className="col-sm-2 col-md-2">
                  <Category/>
               </div>
               <div className=" border -start col-sm-10 col-md-10">
                <Caurosel/>
            
           
           
                <div className="row">
                {
                isBooksLoading && <LoadSpinner message="loading the page"/>
                }
                    <Card/>
                 </div>
                <div className="row">
                {
                isBooksLoading && <LoadSpinner message="loading the page"/>
                }
                    <AwardWinner/>
                        
               </div>
            </div>
            
        </div>
            
    </div>
    )
}
export default HomePage