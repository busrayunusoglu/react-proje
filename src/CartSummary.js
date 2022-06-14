import React, { Component } from "react";
import {Link} from "react-router-dom";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Badge,
  NavItem,
  NavLink,
} from "reactstrap";
import { TiShoppingCart } from "react-icons/ti";
import { BsTrash } from "react-icons/bs";

export default class CartSummary extends Component {
  // Sepet için açılır liste mantığında bir yol izledik
  // Yazdığımız kodlarda => eğer sepet boş ise hali hazırda görünen sepetimiz döndürülür.
  // Sepete ürün eklendiğinde sepetin yanına(<TiShoppingCart/> - {this.props.cart.length}) kaç farklı ürün eklendiği saydırılır.
  // Açılır listeye tıklandığında ekledğimiz ürünleri adı ve ne kadar eklendiği gösterilir. (satır 28-35)
  renderSummary() {
    return (
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret style={{color:"white",marginLeft:"40px"}}>
        <TiShoppingCart/> - {this.props.cart.length}
        </DropdownToggle>
        <DropdownMenu right>
          {this.props.cart.map((cartItem) => (
            <DropdownItem key={cartItem.product.id}>
              <Badge
                color="link"
                onClick={() => this.props.removeFromCart(cartItem.product)}
              ><BsTrash style={{color:"red"}} /></Badge>&nbsp;
              {cartItem.product.productName}&nbsp;
              <Badge color="success">{cartItem.quantity}</Badge>
            </DropdownItem>
          ))}
          <DropdownItem divider />
          <DropdownItem>
            <Link to="cart" style={{color:"#2BAEB9"}}>Sepete git</Link>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  }

  renderEmptyCart() {
    return (
      <NavItem>
        <NavLink style={{color:"white",marginLeft:"80px"}}><TiShoppingCart/></NavLink>
      </NavItem>
    );
  }

  render() {
    return (
      <div>
        {this.props.cart.length > 0
          ? this.renderSummary()
          : this.renderEmptyCart()}
      </div>
    );
  }
}