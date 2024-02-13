'use client'
import React, { useState, Fragment } from 'react'
import { FaBars } from 'react-icons/fa'
import Link from 'next/link'

import './App.css'

import styled from 'styled-components'

const Nav = styled.nav`
  background: transparent;
  height: 80px;
  display: flex;
  justify-content: center;
  text-decoration-color: white;
  align-items: center;
  font-size: 1rem;
  /* Fix your navbar by using below two lines of code */
  position: sticky;
  top: 0;
  /* Fix your navbar by using above two lines of code */
  z-index: 10;
  a:hover {
    font-size: 1.25rem;
  }

  @media screen {
    transition: 0.8s all ease;
  }
`

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 80px;
  z-index: 1;
  width: 100%;
  padding: 0 24px;
  max-width: 1100px;
  color: white;
`

const NavLogo = styled.a`
  color: white;
  justify-self: flex-start;
  cursor: pointer;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  margin-left: -12px;
  font-weight: bold;
  text-decoration: none;
`

const MobileIcon = styled.div`
  display: none;

  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 60%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`

const NavMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 40%;
  list-style: none;
  text-align: center;
  margin-right: -22px;
  text-decoration: none;

  @media screen and (max-width: 768px) {
    display: none;
  }
`

const NavItem = styled.li`
  height: 80px;

  @media screen and (max-width: 768px) {
    height: 60px;
  }
`

const NavLinks = styled.a`
  color: white;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 0.8rem;
  height: 100%;
  cursor: pointer;
  transition: all 250ms ease-in-out;

  &.active {
    border-bottom: 3px solid white;
  }

  @media screen and (max-width: 768px) {
    text-align: center;
    padding: 0;
    width: 100%;
    display: table;
  }
  &:hover {
    border-radius: 8px;
    background: rgba(9, 9, 9, 0.2);
    color: #007bff;
  }
`

const MobileMenu = styled.div`
  position: fixed;
  top: 0;
  border-color: white;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  z-index: 1000;
  overflow-y: auto;
  transition: all 0.5s ease-out;
`

const MobileMenuLinks = styled.div`
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 32px;
  width: 100%;

  @media screen and (max-width: 768px) {
    display: block;
  }
`

const MobileMenuLink = styled(NavLinks)`
  color: white;
  display: grid;
  align-items: center;
  text-decoration: none;
  padding: 1rem 0;
  width: 100%;
  font-size: 1.5rem;

  &:hover {
    color: #007bff;
    transition: all 0.3s ease;
  }
`

const Navbar = () => {
  const [colorChange, setColorchange] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const changeNavbarColor = () => {
    if (window.scrollY >= 80) {
      setColorchange(true)
    } else {
      setColorchange(false)
    }
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const handleMobileMenuLinkClick = (e: any) => {
    e.stopPropagation()
    toggleMobileMenu()
  }

  window.addEventListener('scroll', changeNavbarColor)

  return (
    <Fragment>
      <Nav className={colorChange ? 'navbar colorChange' : 'navbar'}>
        <NavContainer>
          <NavLogo href="/">Founder's Club</NavLogo>
          <MobileIcon onClick={toggleMobileMenu}>
            <FaBars />
          </MobileIcon>
          <NavMenu>
            <NavItem>
              <Link href="/about">
                <NavLinks>About</NavLinks>
              </Link>
            </NavItem>
            <NavItem>
              <Link href="/events">
                <NavLinks>Events</NavLinks>
              </Link>
            </NavItem>
            <NavItem>
              <Link href="/team">
                <NavLinks>Team</NavLinks>
              </Link>
            </NavItem>
            <NavItem>
              <Link href="/contact">
                <NavLinks>Contact</NavLinks>
              </Link>
            </NavItem>
            <NavItem>
              <Link href="/gallery">
                <NavLinks>Gallery</NavLinks>
              </Link>
            </NavItem>
          </NavMenu>
        </NavContainer>
      </Nav>
      {mobileMenuOpen && (
        <MobileMenu
          onClick={toggleMobileMenu}
          className={mobileMenuOpen ? 'menu-open' : ''}
        >
          <MobileMenuLinks>
            <div className="close-button" onClick={handleMobileMenuLinkClick}>
              X
            </div>
            <MobileMenuLink onClick={handleMobileMenuLinkClick} href="/about">
              About
            </MobileMenuLink>
            <MobileMenuLink onClick={handleMobileMenuLinkClick} href="/events">
              Events
            </MobileMenuLink>
            <MobileMenuLink onClick={handleMobileMenuLinkClick} href="/team">
              Team
            </MobileMenuLink>
            <MobileMenuLink onClick={handleMobileMenuLinkClick} href="/contact">
              Contact
            </MobileMenuLink>
            <MobileMenuLink onClick={handleMobileMenuLinkClick} href="/gallery">
              Gallery
            </MobileMenuLink>
          </MobileMenuLinks>
        </MobileMenu>
      )}
    </Fragment>
  )
}

export default Navbar
