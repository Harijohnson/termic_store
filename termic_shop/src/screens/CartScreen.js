import React,{useEffect} from 'react'
import { Link,useParams,useLocation } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { Row,Cal,ListGroup,Image,Form,Button,Card } from 'react-bootstrap'
import { Message } from '../components/Message'
import { addToCart } from '../actions/cartActions'


function CartScreen() {
  const productId = useParams();
  const location = useLocation();
  const qty  = location.search ? location.search.split('=') : 1
  console.log(qty)








  return (
    <div>
      Cart
    </div>
  )
}

export default CartScreen
