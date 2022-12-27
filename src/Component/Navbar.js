import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'

const Header = () => {
  return (
    <Navbar bg="light" variant="light">
    <Container>
      <Navbar.Brand href="#home" className='header'>NBA TEAM</Navbar.Brand>
    </Container>
  </Navbar>
  )
}

export default Header