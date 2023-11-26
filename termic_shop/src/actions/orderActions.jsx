import { 
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAILE } from '../constants/OrderConstant'
import axios from 'axios'




export  const  createOrder= ( order ) => async (dispatch,getState) => {
    try{
        dispatch({
            type:ORDER_CREATE_REQUEST,
    })

    const {
        userLogin : { userInfo },
    }=getState()



    const config = {
        headers:{
            'Content-type':'application/json',
            Authorization  :`Bearer ${userInfo.token}`
        }

    }
    const {data} = await axios.post(
        `/api/orders/add/`,
        order,
        config
        )
    
    dispatch({
        type:ORDER_CREATE_SUCCESS,
        payload:data,
    })

    }
    catch(error){
        dispatch({
            type:    ORDER_CREATE_FAILE,
            payload:error.response && error.response.data.detail
            ?
            error.response.data.detail:
            error.detail,
        })
    }
}

























