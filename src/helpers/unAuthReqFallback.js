import { setError } from "../store/errorSlice"
import ResetAllState from "./ResetAllState"

export const unAuthReqFallback = (dispatch, history) => {
    ResetAllState(dispatch)
    dispatch(setError("Unauthorized access detected. Please login again."))
    history.push("/")
}