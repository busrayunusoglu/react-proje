import React, { Component } from "react";
import { Table, Button, Media } from "reactstrap";
import { TiArrowSync } from "react-icons/ti";
import { ImArrowRight2 } from "react-icons/im";

export default class ProductList extends Component {
  // API'den aldığımız verilere göre listelediğimiz ürün listesi
  // Tablo (<table>) yapısı ile çalıştık
  
  render() {
      const myStyle={
          cursor : "default",
          color : "rgb(43, 174, 185)"
      }
      
    return (
      <div>
        <h3 style={myStyle}>
          Ürün Listesi <ImArrowRight2 /> {this.props.currentCategory}
        </h3>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th style={{ textAlign: "center" }}>Ürün</th>
              <th>Ürün Adı</th>
              <th>Fiyat</th>
              <th>Stok</th>
              <th></th>
              <th>
                <Button color="warning">
                  <TiArrowSync />
                </Button>
              </th>
            </tr>
          </thead>
          <tbody>
            {this.props.products.map((product) => (
              <tr key={product.id}>
                <th scope="row">{product.id}</th>
                <td>
                  <Media
                    src={product.images}
                    style={{ width: 200, height: 200 }}
                  />
                </td>
                <td>{product.productName}</td>
                <td>{product.unitPrice + "₺"}</td>
                <td>{product.unitsInStock}</td>
                <td>
                  <Button
                    onClick={() => this.props.addToCart(product)}
                    color="info"
                  >
                    +
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}
