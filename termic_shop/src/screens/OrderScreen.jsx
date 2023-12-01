import React,{ useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
import { Row,Col,ListGroup,Card,Image } from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import { Link,useParams } from 'react-router-dom'
import Message from '../components/Message'
import { getOrderDetails,payOrder } from '../actions/orderActions'
import Loader from '../components/Loader'
import { PayPalButton } from 'react-paypal-button-v2'
import { ORDER_PAY_RESET } from '../constants/OrderConstant'





function OrderScreen(  {match} ) {
    const  { id } = useParams();
    // const orderId = match.params.id

    const orderId  = id
    const  dispatch = useDispatch()

    const [sdkReady,setSdkReady] = useState(false) 

    // const navigate = useNavigate();
    
    const orderPay = useSelector((state)=>state.orderPay)
    const { loading:loadingPay, success:successPay } = orderPay

    const orderDetails = useSelector((state)=>state.orderDetails)
    const { order,error,loading } = orderDetails

    if (!loading && !error){
    order.itemsPrice = order.orderItems.reduce((acc,item) => acc + item.price * item.qty,0 ).toFixed(2)
    } 
    

    const addPayPalScript = () =>{
        const script =document.createElement('script')
        script.type = 'text/javascript'
        script.src = 'https://www.paypal.com/sdk/js?client-id=AazML7DItushjgZYVB1vO-ZbyHPYlUOymuhxCtQS5bOUPFxPT0jjdu7cRKj9j7dZXQUqLbVr-ZUGtmcd&components=buttons'
        script.async=true
        script.onload = () =>{
            setSdkReady(true)
        }       
        document.body.appendChild(script)

    
    }

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                if (!order || successPay || order._id !== Number(orderId)) {
                dispatch({type:ORDER_PAY_RESET})
                 dispatch(getOrderDetails(Number(orderId)));
                }
                else if(!order.isPaid){
                    if(!window.paypal){
                        addPayPalScript()
                    }
                    else{
                        sdkReady(true)
                    }
                }
            } catch (error) {
                console.error('Error fetching order details:', error);
                // Handle error, e.g., show an error message
            }
        };
    
        fetchOrderDetails();
    }, [order, orderId, dispatch,successPay]);



    const successPaymentHandler= (paymentResult) =>{
        dispatch(payOrder(orderId,paymentResult))
    }



    return loading ? <Loader /> 
    : error ? (
        <Message varient='danger'>{error}</Message>
    ): 
    <div>
        <h1>Order : {order._id}</h1>
      <Row>
        <Col md={8}>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <h2>Shipping </h2>
                    <p>
                        <strong>Name : </strong> {order.user.name}</p>
                    <p>
                        <strong>Email : </strong> <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                    </p>
                    <p>
                        <strong>    
                            Shipping :
                        </strong>
                        {order.shippingAddress.address},
                        {order.shippingAddress.city},{' '}
                        {order.shippingAddress.postalCode},
                        {order.shippingAddress.country}.
                    </p>
                    {order.isDelivered ? (
                        <Message variant = 'success'>Delivered On : {order.isDelivered}</Message>
                    ): (
                        <Message variant = 'warning'>Not Delivered</Message>
                    )}
                </ListGroup.Item>

                <ListGroup.Item>
                    <h2>Payment Method  </h2>

                    <p>
                        <strong>
                            Method :
                        </strong>
                        {order.paymentMethod}
                        
                    </p>

                    {order.isPaid ? (
                        <Message variant = 'success'>Paid On : {order.paidAt}</Message>
                    ): (
                        <Message variant = 'warning'>Not Paid</Message>
                    )}
                </ListGroup.Item>

                <ListGroup.Item>
                    <h2>Order Item  </h2>
                    {order.orderItems.length ===0 ? <Message varient='info'>
                        Order is Empty
                    </Message> : (
                        <ListGroup varient='flush'>
                            {order.orderItems.map((item,index)=>(
                                <ListGroup.Item key={index}>
                                    <Row>
                                        <Col md={1}>
                                            <Image src={item.image}  alt={item.name} fluid rounded/>

                                        </Col>
                                        <Col varient='info'>
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        </Col>

                                        <Col md={4}>
                                            {item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                  
                </ListGroup.Item>



            </ListGroup>

        </Col>



        <Col md={4}>
            <Card>
                <ListGroup varient='flush'>
                    
                    <ListGroup.Item>
                        <h2>Order SUmmary</h2>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col>
                                Items : 
                            </Col>
                            <Col>
                                ${order.itemsPrice}
                            </Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col>
                                Shipping :
                            </Col>
                            <Col>
                                ${order.shippingPrice}
                            </Col>
                        </Row>
                    </ListGroup.Item>
                            
                    <ListGroup.Item>
                        <Row>
                            <Col>
                                Tax :
                            </Col>
                            <Col>
                                ${order.taxPrice}
                            </Col>
                        </Row>
                    </ListGroup.Item>
                            
                    <ListGroup.Item>
                        <Row>
                            <Col>
                                Total :
                            </Col>
                            <Col>
                                ${order.totalPrice}
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    
                    {!order.isPaid && (
                        <ListGroup.Item>
                            {loadingPay && <Loader />}
                            {!sdkReady ? (
                                <Loader />

                            ) :(
                                <PayPalButton 
                                amount={order.totalPrice}
                                onSuccess={successPaymentHandler} />
                            )}
                        </ListGroup.Item>
                    )
                    }
                </ListGroup>
            </Card>
            
        </Col>
      </Row>
    </div>
}

export default OrderScreen


// client id from paypal site
// AZkuuNMjCrMWUvFBVKsyt3TlS3fQCdt4rTUdkpI5CCyUvnTKdjO1Qxx_VFPhwqmoStJE1LWDvUtGPKJh