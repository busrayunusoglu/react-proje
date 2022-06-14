import React, { Component } from "react";
import { GiGamepad } from "react-icons/gi";

export default class Footer extends Component {
  // Sitemizin "footer" componenti ve verdiğimiz stiller.
  render() {
    const myStyle = {
      textAlign : "center",
      alignItems : "center",
      justifyContent : "center",
      backgroundColor: "#212529",
      color: "white",
      position : "fixed",
      left : "0",
      bottom : "0",
      width : "100%",
      height: "30px"
    };

    return (
      <div>
        <footer style={myStyle}>
        <p>&copy; 2020 <a href="/.">Oyuncu Mağazası <GiGamepad/></a> | Tüm hakları saklıdır.</p>
        </footer>
      </div>
    );
  }
}
