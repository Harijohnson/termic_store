import React,{ useEffect,useState } from 'react'
import { Link, useLocation,useNavigate,useParams } from 'react-router-dom'
import { Form,Button,Col,Row } from 'react-bootstrap'
import  Loader   from '../components/Loader'
import  Message   from '../components/Message'
import { useDispatch,useSelector } from 'react-redux'
import { getUserDetails } from '../actions/userActions'
import  FormContainer   from '../components/FormContainer'


function EditUserScreen() {

    const  { id } = useParams();
    // const orderId = match.params.id

    const userId  = id


    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [isAdmin,setIsAdmin] = useState(false)
    
    const dispatch = useDispatch()

    

    const userDetails = useSelector((state) => state.userDetails)
    const { error,loading,user } = userDetails

    useEffect (() => {
        if(!user.name || user._id !== Number(userId)) {
            dispatch(getUserDetails(userId))
        }else{
            setName(user.name)
            setEmail(user.email)
            setIsAdmin(user.isAdmin)
        }
        
    },[user,userId])

    const submitHandeler = (e) => {
        e.preventDefault()

    }
  return (

    <div>

        <Link to='/admin/userlist'>Go Back</Link>

        <FormContainer>
            <h1>Edit User</h1>
            {loading ? <Loader />
            :error ?  (<Message variant='danger'>{error}</Message>)
            :(
                <Form onSubmit={ submitHandeler }>
                <Form.Group controlId='name'>
                        <Form.Label>
                            Name
                        </Form.Label>
                        <Form.Control 
                        type='text'
                        placeholder='Name'
                        value={name}
                        onChange={(e)=>setName(e.target.value)}>

                        </Form.Control>
                    </Form.Group>
                    
                    <Form.Group controlId='email'>
                        <Form.Label>
                            Email Address
                        </Form.Label>
                        <Form.Control
                        type='email'
                        placeholder='Enter Email'
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}>

                        </Form.Control>
                    </Form.Group>

                    <br/>
                    <Form.Group controlId='isAdmin'>
                        <Form.Check type='checkbox'
                            checked={isAdmin}
                            label='Is Admin'
                            onChange={(e)=>setIsAdmin(e.target.checked)}>
                                

                        </Form.Check>
                       
    
                    </Form.Group>

                    <br></br>

                    <Button 
                    type='submit'
                    variant='primary' >
                        Update
                    </Button>


                </Form>

            )}
        </FormContainer>
    </div>
  )
}

export default EditUserScreen
