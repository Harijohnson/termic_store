import React,{useEffect} from 'react'
import { Link,useParams,useLocation } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { Row,Cal,ListGroup,Image,Form,Button,Card } from 'react-bootstrap'
import { Message } from '../components/Message'
import { addToCart } from '../actions/cartActions'


function CartScreen() {
  const location = useLocation();
  // console.log(location);
  // const searchParams = new URLSearchParams(location.search);
  // console.log(searchParams.toString());
  const pathnameArray = location.pathname.split('/');
  const productId = pathnameArray[pathnameArray.length - 1];
  // const productId = searchParams.get('id'); 
  console.log(productId)
  const qty  = location.search ? Number(location.search.split('=')[1]) : 1
  const dispatch = useDispatch()
  







  useEffect(()=>{
    if(productId){
      dispatch(addToCart(productId,qty))
    }
  },[dispatch,productId,qty])


  return (
    <div>
      Cart
    </div>
  )
}

export default CartScreen
