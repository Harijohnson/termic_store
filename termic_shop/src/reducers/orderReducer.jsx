import { 
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAILE,
    ORDER_CREATE_RESET } from '../constants/OrderConstant'



export const orderCreateReducer = (state={},action) => {
    switch (action.type){
        case ORDER_CREATE_REQUEST:
            return {
                loading:true,
            }
        case ORDER_CREATE_SUCCESS:
            return {
                loading:false,
                success:true,
                order:action.payload,
            }
        case ORDER_CREATE_FAILE:
            return {
                loading:false,
                error:action.payload,
            }
        case ORDER_CREATE_RESET:
            return {  }       // RESETING THE CART AFTER SUCCESSFULL SUBMITION OF ORDER
        default:
            return state
    }
}









































