import React,{Fragment, useState} from 'react'
import {Link, Navigate} from "react-router-dom"
import { useSelector,useDispatch } from 'react-redux';
import { logout } from '../redux/actions/authActions';
import { useNavigate } from 'react-router-dom';
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
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
const navigate=useNavigate()
  const isAuth = useSelector((state) => state.authReducer.isAuth);
  console.log(isAuth,"isAUth")
  const user = useSelector((state) => state.authReducer.user);

  const toggle = () => setIsOpen(!isOpen);

  const logoutUser = () => {
    dispatch(logout());
    navigate("/")
  };

  const authLinks = (
    <Fragment>
      <NavItem>
        <Link to="/dashboard">
          <span className="navbar-text mr-3">
            <strong>{user ? `Welcome ${user.name}` : null}</strong>
          </span>
        </Link>
      </NavItem>
      <NavLink href="#" onClick={logoutUser}>
        Logout
      </NavLink>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <NavItem>
        <RegisterModal />
      </NavItem>
      <NavItem>
        <LoginModal />
      </NavItem>
    </Fragment>
  );

  return (
    <div>
      <Navbar color="dark" dark expand="sm" className="mb-5">
        <Container>
          <NavbarBrand href="/">Home</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {isAuth ? authLinks : guestLinks}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default AppNavbar;