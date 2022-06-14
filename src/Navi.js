import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Media
} from "reactstrap";
import CartSummary from "./CartSummary";
import { TiPhone } from "react-icons/ti";

// Navbar componentimiz

const Navi = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="dark" light expand="lg">
        <NavbarBrand
          href="/"
          style={{ color: "#2BAEB9" }}
        >
          <Media src="/images/logo.png"/>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar style={{ marginLeft: "600px" }}>
            <NavItem>
              <NavLink>
                <Link to="form2" style={{ color: "white" }}>
                  {" "}
                  İletişim <TiPhone />{" "}
                </Link>
              </NavLink>
            </NavItem>
            <CartSummary
              removeFromCart={props.removeFromCart}
              cart={props.cart}
            />
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Navi;
