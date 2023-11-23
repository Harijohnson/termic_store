import React,{useEffect, useState} from 'react'
import { Link,useParams,useNavigate  } from 'react-router-dom'
import { Row,Col,Image,ListGroup,Card,Button,Form, } from 'react-bootstrap'
import Rating from '../components/Rating'
import { useDispatch,useSelector } from 'react-redux'
import { listProductDetails } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'





function ProductScreen(  { match,history }  ) {
  const { id } = useParams();
  const dispatch = useDispatch()
  const productDetails = useSelector(state => state.productDetails)
  const { loading,error,product } = productDetails
  const [qty,setQty] = useState(1)
  const navigate = useNavigate();

  useEffect(()=>{
      dispatch(listProductDetails(id))
    
      },[dispatch,id])
    
  const addToCartHandeler = () =>{
      navigate(`/cart/${id}?qty=${qty}`)
  }
  return (
    <div>
      <Link to='/' className='btn btn-light my-3'>Go Back</Link>
        {loading ?
          <Loader />
          :
          error ?
          <Message variant={'danger'}> {error}</Message>
          :
          (
            <Row>

            <Col md={6}>
              <Image src={product.image}  alt ={product.name}/> 
            </Col>
    
            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
    
                <ListGroup.Item>
                  <Rating value={product.rating} text={`${product.numReviews} reviews`}  color={'#f8e825'}/>
                </ListGroup.Item>
                
                <ListGroup.Item>
                  <strong>Price : ${product.price} </strong>
                </ListGroup.Item>
    
                <ListGroup.Item>
                  Discription : {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
    
            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col> Price:</Col>
                      <Col> <strong>{product.price}</strong> </Col>
                    </Row>
                  </ListGroup.Item>
    
    
                  <ListGroup.Item>
                    <Row>
                      <Col> Status:</Col>
                      <Col> {product.countInStock >0 ? 'In Stock' :'Out of Stock'}</Col>
                    </Row>
                  </ListGroup.Item>



                  
                    {product.countInStock > 0 && (
                      <ListGroup.Item>
                        <Row>
                          <Col>
                          Quantity
                          </Col>
                          <Col className='my-1'>
                            <Form.Control  
                            as='select'
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}

                            >
                              {
                                [...Array(product.countInStock).keys()].map((x) => (
                                  <option value={ x + 1 }  key={ x + 1 } >
                                    { x + 1 }
                                  </option>
                                ))
                              }
                            </Form.Control>
                          </Col>
                        </Row>
                      </ListGroup.Item> 
                    ) }
                  


                  <ListGroup.Item>
                    <Button className='btn-block' 
                    type='button' 
                    disabled={product.countInStock === 0}
                    onClick={addToCartHandeler}
                    >
                      Add to Cart
                    </Button>
                  </ListGroup.Item>
    
    
                </ListGroup>
              </Card>
            </Col>
    
          </Row>
          )
        
        }    
    </div>
  )
}

export default ProductScreen
