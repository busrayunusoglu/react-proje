import React, { Component } from "react";
import { Table, Button, Media } from "reactstrap";
import { BsTrash } from "react-icons/bs";

export default class CartList extends Component {
  // Sepete eklenen ürünleri göstermek için oluşturduğumuz kodlar.
  // "/cart" route için görünen component.
  // Burada da tablo mantığı ile çalışarak sepetteki ürünleri props ile gösterdik.
  renderCart() {
    return (
      <Table striped>
        <thead>
          <tr>
            <th>#</th>
            <th style={{textAlign:"center"}}>Ürün</th>
            <th>Ürün Adı</th>
            <th>Birim Fiyatı</th>
            <th>Miktar</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {this.props.cart.map((cartItem) => (
            <tr key={cartItem.product.id}>
              <td>{cartItem.product.id}</td>
              <td><Media src={cartItem.product.images} style={{ width: 100, height: 100}}/></td>
              <td>{cartItem.product.productName}</td>
              <td>{cartItem.product.unitPrice + " ₺"}</td>
              <td>{cartItem.quantity}</td>
              <td>
                <Button
                  color="link"
                  onClick={() => this.props.removeFromCart(cartItem.product)}
                >
                   <BsTrash style={{width:"20px", height:"22px",color:"red"}} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      
    );
  }

render() {
  return <div>{this.renderCart()}</div>;
}
}