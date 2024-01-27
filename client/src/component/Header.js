import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
export const Header = () => {
  return (
    <Navbar  data-bs-theme="dark" className="navbar" >
      <Navbar.Brand href="#home">React Test App</Navbar.Brand>
    </Navbar>
  ); 
};
