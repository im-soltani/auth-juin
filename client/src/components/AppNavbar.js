import React,{Fragment, useState} from 'react'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container,
  } from 'reactstrap';
  import LoginModal from "./auth/LoginModal"
  import RegisterModal from "./auth/RegisterModal"


function AppNavbar() {
    const [isOpen,setIsOpen]=useState(false)

const toggleNavbar=()=>{
    setIsOpen(!isOpen)
}

const guestLinks=(
  <Fragment>
    <NavItem>
              <RegisterModal />
              </NavItem>
              <NavItem>
              <LoginModal />
              </NavItem>
  </Fragment>
)


  return (
    <div>
        <Navbar color="dark"  dark expend="sm" className='"mb-5'>
          <Container>
          <NavbarBrand href="/" >Home</NavbarBrand>
          <NavbarToggler onClick={toggleNavbar}/>
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
             
            {guestLinks}
            </Nav>
          </Collapse>
          </Container>
        </Navbar>
    
    </div>
  )
}

export default AppNavbar