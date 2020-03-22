import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavbarBrand,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Logout } from '../Redux/Action';
// import Image from '../Public/Assets/youtube.png'

const Example = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const gState = useSelector(({auth}) => {
    return{
      logged : auth.logged,
      username : auth.username

    }
  });
  // console.log(gState)
  const dispatch = useDispatch(); //untuk function component
  const logOut = () => {
    dispatch(Logout())
    localStorage.removeItem('token')//param 1 key memnbuat value juga hilang
  };
  

  return (
    <div>
      <Navbar expand="md" light style={{ backgroundColor : 'none' }}>
          <NavbarBrand tag={Link} to={'/'}>
          Shoesilo
          </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink tag={Link} to={'/products'}>Men</NavLink>
            </NavItem>
            <NavItem>
              <NavLink>Women</NavLink>
            </NavItem>
            <NavItem>
              <NavLink>Kids</NavLink>
            </NavItem>
          {/* </Nav> */}
          {/* <Nav navbar> */}
            <UncontrolledDropdown nav inNavbar style={{ float: 'right' }}>
              <DropdownToggle nav caret>
                {
                  gState.logged ?
                  <div style={{display: 'inline', fontWeight: '700'}}>
                    {gState.username}
                  </div>
                  :
                <FontAwesomeIcon icon={faUser}/>
                }
              </DropdownToggle>
              {
                gState.logged
                ?
                <DropdownMenu right>
                  <Link to='/cart'>
                    <DropdownItem>
                      Cart
                    </DropdownItem>
                  </Link>
                  <Link to='/transaction'>
                  <DropdownItem>
                    Transaction History
                  </DropdownItem>
                  </Link>
                  <DropdownItem>
                    Payment
                  </DropdownItem>
                  <Link to='/profile'>
                  <DropdownItem>
                    Profile
                  </DropdownItem>
                  </Link>
                  <Link to ='/'>
                    <DropdownItem onClick={logOut}>
                      Log Out
                    </DropdownItem>
                  </Link>
                </DropdownMenu>
                :
                <DropdownMenu right>
                  <Link to='/login'>
                    <DropdownItem>
                      Login
                    </DropdownItem>
                  </Link>
                  <Link to='/register'>
                    <DropdownItem>
                      Register
                    </DropdownItem>
                  </Link>
                </DropdownMenu>
              }
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Example;