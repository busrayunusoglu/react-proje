import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";

export default class CategoryList extends Component {
  state = {
    categories: [],
  };

  // Bir bileşen DOM ağacına eklendikten hemen sonra çalışan fonksiyon.
  // Kategorileri göstermeyi bu fonksiyon içinde çalıştırdık.
  componentDidMount() {
    this.getCategories();
  }

  getCategories = () => {
    fetch("http://localhost:3000/categories")
      .then((response) => response.json())
      .then((data) => this.setState({ categories: data }));
  };

  render() {

    // Gerekli css tanımlamaları
    const myStyle = {
      cursor: "default",
      color: "rgb(43, 174, 185)",
    };

    function changeColor(e){
      e.target.style.background = "rgb(43, 174, 185)";
      e.target.style.fontWeight = "bold";
    }

    function changeColor2(e){
      e.target.style.background = "white";
      e.target.style.color = "black";
      e.target.style.fontWeight = "normal";
      
    }
    
    return (
      // API'den aldğımız "categoryName" 'e göre kategorileri listeledik.
      <div>
        <h3 style={myStyle}>KATEGORİLER</h3>
        <ListGroup>
          {this.state.categories.map((category) => (
            <ListGroupItem
              style={{ cursor: "pointer" }}
              active={
                category.categoryName === this.props.currentCategory
                  ? true
                  : false
              }
              onClick={() => this.props.changeCategory(category)}
              onMouseOver={changeColor}
              onMouseOut={changeColor2}
              key={category.id}
            >
              {category.categoryName}
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
    );
  }
}
