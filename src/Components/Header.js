import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
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
import Image from '../Public/Assets/youtube.png'

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
        {/* <NavbarBrand> */}
          <Link to='/' style={{color: 'gray', textDecoration: 'none'}}>
          <img src={Image} alt='image' style={{width:'160px'}}/>
          </Link>
        {/* </NavbarBrand> */}
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink>Men</NavLink>
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
                <FontAwesomeIcon icon={faUser}/>
              </DropdownToggle>
              {
                gState.logged
                ?
                <DropdownMenu right>
                    <DropdownItem>
                      Cart
                    </DropdownItem>
                    <DropdownItem>
                      Transaction History
                    </DropdownItem>
                    <DropdownItem>
                      Profile
                    </DropdownItem>
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