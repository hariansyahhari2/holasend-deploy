import React, { useState, useEffect } from 'react';
import { FaBars } from 'react-icons/fa';
import {
  Nav,
  NavbarContainer,
  NavLogo,
  MobileIcon,
  NavMenu,
  NavItem,
  NavLinks,
  NavBtn,
  NavLink,
} from './NavbarElement';

const NavBar = ({ toggle }) => {
  const [scrollNav, setSrcollNav] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"))
  const changeNav = () => {
    return window.scrollY >= 80 ? setSrcollNav(true) : setSrcollNav(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', changeNav);
  }, []);

  const toggleHome = () => { };
  
  return (
    <>
      <Nav scrollNav={scrollNav}>
        <NavbarContainer>
          <NavLogo to="/" onClick={toggleHome}>
            hola<span style={{ color: '#152C5B' }}>Send!</span>
          </NavLogo>
          <MobileIcon onClick={toggle}>
            <FaBars />
          </MobileIcon>
          <NavMenu>
            <NavItem>
              <NavLinks
                to="home"
                offset={-80}
                smooth={true}
                duration={500}
                spy={true}
                exact="true"
              >
                Home
              </NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks
                to="services"
                offset={-80}
                smooth={true}
                duration={500}
                spy={true}
                exact="true"
              >
                Services
              </NavLinks>
            </NavItem>
            <NavBtn>
              {
                token ?
                  <NavLink href="dashboard">
                    Dashboard
                </NavLink> :
                  <NavLink href="login">
                    Sign in
               </NavLink>
              }
            </NavBtn>
          </NavMenu>
        </NavbarContainer>
      </Nav>
    </>
  );
};

export default NavBar;
