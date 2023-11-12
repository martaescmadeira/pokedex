import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
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
            <Link style={{ textDecoration: "none", color:"white", marginRight: "20px" }} to="/">Home</Link>
            <Link style={{ textDecoration: "none", color:"white"}} to="/about">About</Link>
            
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
