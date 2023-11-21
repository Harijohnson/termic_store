
import Container from 'react-bootstrap/Container';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import React from 'react'

function Header() {
  return (
    <header>
        <Navbar expand="lg"    className="bg-body-tertiary" collapseOnSelect>
            <Container fluid>
                <Navbar.Brand href="/">TermicShop</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/cart"><i className='fas fa-shopping-cart'></i></Nav.Link>
                    <Nav.Link href="/login"><i className='fas fa-user'></i></Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
   
  )
}

export default Header
