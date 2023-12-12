import React,{useState} from 'react'
import { Button,Form } from 'react-bootstrap'
import { useParams,useNavigate } from 'react-router-dom'

function SearchBox() {
    
    const [keyword,setKeyword] = useState('')


    let navigate  = useNavigate()

    const submitHandler = (e) =>{
        e.preventDefault()

        if(keyword){
            navigate(`/?keyword=${keyword}&page=1`)
        }else{
            navigate(window.location.pathname);
        }
    }



  return (
    <Form  onSubmit={submitHandler} inline='true'>
      <Form.Control
      type='text'
      name = 'q'
      onChange={(e)=>setKeyword(e.target.value)}
      className='mr-sm-9 ml-sm-10'
      ></Form.Control>


        <Button 
        type='submit'
        variant='outline-success'
        className='p-2'
        >
            Search
        </Button>
    </Form>
  )
}

export default SearchBox
