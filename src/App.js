import React, { Component } from "react";
import Navi from "./Navi";
import ProductList from "./ProductList";
import CategoryList from "./CategoryList";
import { Container, Row, Col, Media, Button, Table } from "reactstrap";
import alertify from "alertifyjs";
import { Route, Switch } from "react-router-dom";
import NotFound from "./NotFound";
import CartList from "./CartList";
import FormDemo2 from "./FormDemo2";
import Footer from "./Footer";
import { BsSearch } from "react-icons/bs";
import { TiPlus } from "react-icons/ti";
import { RiArrowRightSFill } from "react-icons/ri";

export default class App extends Component {
  // Tanımladığımız state
  state = { currentCategory: "", products: [], cart: [], search: null };

  // Bir bileşen DOM ağacına eklendikten hemen sonra çalışan fonksiyon.
  // Bu yüzden API çağırma işlemini bu döngüde kullandık.
  componentDidMount() {
    this.getProducts();
    this.deleteCart();
    // this.postCart();
    // this.putCart();
  }

  // Kategorileri listeleme ve ürünleri kategori id'sine göre filtreleme(ayırma).
  changeCategory = (category) => {
    this.setState({ currentCategory: category.categoryName });
    this.getProducts(category.id);
  };

  // API için GET işlemi => API'yi verdiğimiz url ile fetch ediyoruz ve verilerimizi getiriyoruz.
  getProducts = (categoryId) => {
    let url = "http://localhost:3000/products";
    if (categoryId) {
      url += "?categoryId=" + categoryId;
    }
    fetch(url)
      .then((response) => response.json())
      .then((data) => this.setState({ products: data }));
  };

  // API için DELETE işlemi => url kısmında son route bölümüne girdiğimiz id numarasını silebiliyoruz.
  deleteCart = () => {
    const deleteToCart = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };

    fetch("http://localhost:3000/products/19", deleteToCart)
      .then((response) => response.json())
      .then((data) => this.setState({ id: data.id }));
  };

  // API için POST(add) işlemi => json formatımıza uygun bilgileri girerek API'ye ekleme işlemi yapabiliyoruz.
  postCart = () => {
    const postToCart = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: 19,
        categoryId: 6,
        productName: "HyperX Cloud II Gaming Kulaklık Kırmızı",
        unitPrice: 900,
        unitsInStock: 36,
        images: "/images/id19.jpg",
      }),
    };
    fetch("http://localhost:3000/products", postToCart)
      .then((response) => response.json())
      .then((data) => this.setState({ id: data.id }));
  };

  // API için PUT(update) işlemi => id'si ile seçtiğimiz ürünün diğer bilgilerini girdiğimiz verilerle değiştirebiliyoruz.
  putCart = () => {
    const putToCart = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: 2,
        categoryId: 1,
        productName: "Logitech G102 Lightsync RGB",
        unitPrice: 500,
        unitsInStock: 17,
        images: "/images/id2.jpg",
      }),
    };
    fetch("http://localhost:3000/products/2", putToCart)
      .then((response) => response.json())
      .then((data) => this.setState({ id: data.id }));
  };

  // Sepete ürün ekleme fonksiyonu
  // Eklediğimiz ürün sepette var ise o ürünün sayısını arttırır.
  // Eklediğimiz ürün sepette yok ise ürünü 1 adet ekler ve sonraki eklemeler arttırarak(+=) devam eder.
  addToCart = (product) => {
    let newCart = this.state.cart;
    var addedItem = newCart.find((c) => c.product.id === product.id);
    if (addedItem) {
      addedItem.quantity += 1;
    } else {
      newCart.push({ product: product, quantity: 1 });
    }
    this.setState({ cart: newCart });
    alertify.success(product.productName + " ürünü sepetinize eklendi!", 2);
  };

  // Ürünü sepetten kaldırma fonksiyonu
  removeFromCart = (product) => {
    let newCart = this.state.cart.filter((c) => c.product.id !== product.id);
    this.setState({ cart: newCart });
    alertify.error(product.productName + " ürünü sepetinizden kaldırıldı!", 2);
  };

  // Ürün arama(searchBox) fonksiyonu
  searchSpace = (product) => {
    let keyword = product.target.value;
    this.setState({ search: keyword });
  };

  // APP.JS YANİ UYGULAMIZIN TEMEL OLARAK RENDER ETTİĞİ KODLAR.
  render() {
    let productInfo = { title: "ProductList" };
    let categoryInfo = { title: "CategoryList" };

    // SEARCH İŞLEMİ
    const items = this.state.products

      // SearchBox inputumuz boş ise bütün ürünler gösterilir
      // Boş değilse girilen input küçük harflere dönüştürülerek arama işlemi gerçekleşir.
      // Girilen input ile API'deki productName eşleşirse o ürün bize gösterilir(döndürülür).

      // eslint-disable-next-line array-callback-return
      .filter((product) => {
        if (this.state.search == null) {
          return product;
        } else if (
          product.productName
            .toLowerCase()
            .includes(this.state.search.toLowerCase())
        ) {
          return product;
        }
      })
      .map((product) => {
        return (
          <div>
            <tbody>
              <div style={{ width: "10px" }}></div>
              <td style={{ width: "50px" }}> {product.id} </td>

              <td style={{ width: "100px" }}>
                <Media
                  src={product.images}
                  style={{
                    width: 200,
                    height: 200,
                    objectFit: "cover",
                    cursor: "pointer",
                  }}
                />
              </td>
              <div style={{ width: "30px" }}></div>
              <td style={{ width: "320px" }}>{product.productName}</td>
              <div style={{ width: "50px" }}></div>
              <td style={{ width: "150px" }}>{product.unitPrice + "₺"}</td>
              <td></td>
              <td>{product.unitsInStock}</td>
              <td style={{ width: "50px" }}>
                <Button
                  style={{ marginLeft: "80px" }}
                  onClick={() => this.addToCart(product)}
                  color="info"
                >
                  <TiPlus
                    style={{
                      textAlign: "center",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  />
                </Button>
              </td>
            </tbody>

            <hr
              style={{ borderColor: "rgb(43, 174, 185)", filter: "blur(1px)" }}
            />
          </div>
        );
      });

    // Uygulamada sürekli görünen ve döndürülen ana kısım
    return (
      // ReactStrap ile çalıştığımız için kategorilere "3 grid" ve ürünlere ise "9 grid" alan ayırdık.
      // Ürünleri tablo ile sıraladık ve "sepete ekle(+)" butonu ile sepete ekleme fonksiyonu ilişkilendirdik.
      // İletişim, Ana Sayfa ve Sepet için route verdik.

      <div>
        <Container>
          <Navi removeFromCart={this.removeFromCart} cart={this.state.cart} />
          {/* <Search/> */}
          <Row>
            <Col xs="3">
              <br></br>
              <CategoryList
                currentCategory={this.state.currentCategory}
                changeCategory={this.changeCategory}
                info={categoryInfo}
              />
            </Col>
            <Col xs="9">
              <br></br>
              <BsSearch
                style={{
                  position: "absolute",
                  marginLeft: "790px",
                  marginTop: "10px",
                  color: "rgb(43, 174, 185)",
                }}
              />
              <input
                type="text"
                placeholder=" Aramak istediğiniz ürünü giriniz "
                style={{
                  width: "350px",
                  height: "40px",
                  float: "right",
                  border: "2px solid rgb(35, 156, 166)",
                  // color : "rgb(35, 156, 166)",
                  color: "rgb(43, 174, 185)",
                }}
                // onClick={changeColor}
                onChange={(product) => this.searchSpace(product)}
              />

              {/* <Search /> */}
              <br></br>
              <Switch>
                <Route
                  exact
                  path="/"
                  render={(props) => (
                    <ProductList
                      {...props} //propsların kopyasını al onu gönder.
                      products={this.state.products}
                      addToCart={this.addToCart}
                      currentCategory={this.state.currentCategory}
                      info={productInfo}
                    />
                  )}
                >
                  <h4 style={{ cursor: "default", color: "rgb(43, 174, 185)" }}>
                    ÜRÜN LİSTESİ{" "}
                    <RiArrowRightSFill style={{ marginBottom: "5px" }} />{" "}
                    {this.state.currentCategory}
                  </h4>
                  <Table>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th style={{ textAlign: "center" }}>Ürün</th>
                        <th style={{ textAlign: "center" }}>Ürün Adı</th>
                        <th style={{ textAlign: "center" }}>Fiyat</th>
                        <th>Stok</th>
                      </tr>
                    </thead>
                  </Table>
                  {items}
                </Route>
                <Route
                  exact
                  path="/cart"
                  render={(props) => (
                    <CartList
                      {...props} //propsların kopyasını al onu gönder.
                      cart={this.state.cart}
                      removeFromCart={this.removeFromCart}
                    />
                  )}
                ></Route>
                <Route path="/form2" component={FormDemo2}></Route>
                <Route component={NotFound}></Route>
              </Switch>
            </Col>
          </Row>
        </Container>
        <Footer />
      </div>
    );
  }
}
