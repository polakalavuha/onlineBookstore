import {clearLoginStatus} from '../store/userSlice'
import { resetCart } from "../store/cartSlice"

import { resetWishlist } from "../store/wishlistSlice"
const ResetAllState = (dispatch)=>{
    localStorage.clear()
    
    
    dispatch(resetCart())
    dispatch(resetWishlist())
    dispatch(clearLoginStatus())
}
export default ResetAllState