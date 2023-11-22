
import Container from 'react-bootstrap/Container';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap'

import React from 'react'

function Header() {
  return (
    <header>
        <Navbar expand="lg"    className="bg-body-tertiary" collapseOnSelect>
            <Container fluid>
                <LinkContainer to='/'> 
                  <Navbar.Brand  >TermicShop</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">

                  <LinkContainer to='/cart'>
                      <Nav.Link><i className='fas fa-shopping-cart'></i> Cart</Nav.Link>
                    </LinkContainer>

                    <LinkContainer to='/login'>
                      <Nav.Link><i className='fas fa-user'></i> Login</Nav.Link>
                    </LinkContainer>

                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
   
  )
}

export default Header




