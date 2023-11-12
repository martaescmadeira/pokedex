import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';

function NavBar() {
  return (
    <>
      <Navbar className="navbar navbar-dark bg-dark">
        <Container>
          <Navbar.Brand href="#home">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/51/Pokebola-pokeball-png-0.png"
              alt="logo"
              width="30"
              height="30"/>
              </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
