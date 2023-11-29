import { 
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAILE,




    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAILE,
     } from '../constants/OrderConstant'
import axios from 'axios'

import { CART_CLEAR_ITEMS } from '../constants/cartConstants'



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


    dispatch({
        type:CART_CLEAR_ITEMS,
        payload:data,
    })
    

    localStorage.removeItem('cartItems')

    


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





export  const  getOrderDetails= ( id ) => async (dispatch,getState) => {
    try{
        dispatch({
            type:ORDER_DETAILS_REQUEST,
    })

    const {
        userLogin : { userInfo },
    } = getState()



    const config = {
        headers:{
            'Content-type':'application/json',
            Authorization  :`Bearer ${userInfo.token}`
        }

    }
    const {data} = await axios.get(
        // console.log('the product id is :',id)
        `/api/orders/${id}/`,
        config
        )
    
    dispatch({
        type:ORDER_DETAILS_SUCCESS,
        payload:data,
    })





    }
    catch(error){
        dispatch({
            type:    ORDER_DETAILS_FAILE,
            payload:error.response && error.response.data.detail
            ?
            error.response.data.detail:
            error.detail,
        })
    }
}






















