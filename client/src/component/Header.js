import React from "react";
import Navbar from "react-bootstrap/Navbar";
import { NAV_BAR_TEXT } from "../utils";
export const Header = () => {
  return (
    <Navbar  data-bs-theme="dark" className="navbar" >
      <Navbar.Brand href="#home">{NAV_BAR_TEXT}</Navbar.Brand>
    </Navbar>
  ); 
};
