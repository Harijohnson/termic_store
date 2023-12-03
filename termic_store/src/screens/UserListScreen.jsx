import React,{ useEffect } from 'react'
import { Table,Button } from 'react-bootstrap'
import  Loader   from '../components/Loader'
import  Message   from '../components/Message'
import { useDispatch,useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { listUsers,deleteUser } from '../actions/userActions'
import { useNavigate } from 'react-router-dom'




function UserListScreen() {

    const dispatch =useDispatch()
    const navigate = useNavigate();

    const userList  = useSelector(state => state.userList)
    const { loading ,error, users } = userList


    const userLogin  = useSelector(state => state.userLogin)  //get the user info 
    const { userInfo } = userLogin




    const userDelete  = useSelector(state => state.userDelete) 
    const { success:successDelete } = userDelete






    useEffect (() => {
      if(userInfo &&  userInfo.isAdmin){
        dispatch(listUsers())
      }else{
        navigate('/login')
      }
    },[dispatch,navigate,userInfo,successDelete])

    const deleteHandler =(id) => {
      if(window.confirm('Are you suse you want ti delete this user ?')){
      dispatch(deleteUser(id))
      }
    }



  return (
    <div>
    <h1>Users</h1>
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
                    <th>                    Email                  </th>
                    <th>                    Admin                  </th>
                    <th>              </th>
                </tr>
              </thead>


              <tbody>
                {users.map(user => (
                  <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>

                    <td>{user.isAdmin ?
                    ( 
                    <i className='fas fa-check' style={{color:'green'}}></i>
                    ):(
                      <i className='fa-sharp fa-solid fa-xmark' style={{color:'red'}}></i>
                    )}</td>


                      <td>
                          <LinkContainer to={`/admin/${user._id}`}>
                          <Button variant='light' className='btn-sm'>
                            <i className='fas fa-edit'></i>
                          </Button>
                          </LinkContainer>
                          
                          <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(user._id)}>
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

export default UserListScreen
