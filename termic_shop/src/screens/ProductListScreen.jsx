import React,{ useEffect,useState } from 'react'
import { Table,Button,Row,Col } from 'react-bootstrap'
import  Loader   from '../components/Loader'
import  Message   from '../components/Message'
import { useDispatch,useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { listProducts,deleteProduct,createProduct } from '../actions/productActions'
import { useNavigate,useParams } from 'react-router-dom'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'

function ProductListScreen() {

    const dispatch =useDispatch()
    const navigate = useNavigate();

    const  { id } = useParams();
    // const orderId = match.params.id

    const userId  = id


    const productList  = useSelector(state => state.productList)
    const { loading ,error, products } = productList



    const productDelete  = useSelector(state => state.productDelete)
    const { loading:loadingDelete ,error:errorDelete, success:successDelete } = productDelete



    const productCreate  = useSelector(state => state.productCreate)
    const { loading:loadingCreate ,error:errorCreate, success:successCreate ,product:createdProduct } = productCreate




    const userLogin  = useSelector(state => state.userLogin)  //get the user info 
    const { userInfo } = userLogin


    useEffect (() => {


      dispatch({type:PRODUCT_CREATE_RESET})


      if( !userInfo.isAdmin){
        navigate('/login')
      }


      if (successCreate){
        navigate(`/admin/product/${createdProduct._id}/edit`)
      }else{
        dispatch(listProducts())
      }
    },[dispatch,navigate,userInfo,successDelete,successCreate,createdProduct])




    const deleteHandler =(id) => {
      if(window.confirm('Are you sure you want to delete this product ?')){
      // delete product
      dispatch(deleteProduct(id))
      }
    }


    const createProductHandler = () => {
        //create product
        dispatch(createProduct())

    }


  return (
    <div>
    <Row className='aligh-items-center'>
        <Col>
            <h1>Products</h1>
        </Col>
        <Col className='form-group'>
            <Button className='btn float-right' onClick={createProductHandler}>
                <i className='fas fa-plus'>   </i>{'  '} Create Product
            </Button>
        </Col>
    </Row>

    {loadingDelete && <Loader />}
    {errorDelete && <Message variant='danger'>{errorDelete}</Message>}


    {loadingCreate && <Loader />}
    {errorCreate && <Message variant='danger'>{errorCreate}</Message>}




        {loading ?
        (<Loader />)
          :
          error  ?
          (<Message variant='danger'>{error}</Message> )
          : (
            <Table striped bordered hover responsive className='table-sm'>

              <thead>
                <tr>
                    <th>                    ID                  </th>
                    <th>                    Name                  </th>
                    <th>                      Price                </th>
                    <th>                    Category                  </th>
                    <th>                    Brand                  </th>
                    <th>              </th>
                </tr>
              </thead>


              <tbody>
                {products.map(product => (
                  <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>

                      <td>
                          <LinkContainer to={`/admin/product/${product._id}/edit`}>
                          <Button variant='light' className='btn-sm'>
                            <i className='fas fa-edit'></i>
                          </Button>
                          </LinkContainer>
                          
                          <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(product._id)}>
                            <i className='fas fa-trash'></i>
                          </Button>
                      </td>

                      
                    </tr>
                ))}
              </tbody>
            </Table>

          ) }
    </div>
  )
}

export default ProductListScreen
