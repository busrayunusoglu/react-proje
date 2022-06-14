import React, { Component } from 'react'

export default class NotFound extends Component {
    render() {
        return (
            <div>
                {/* ROUTE İÇİN YANLIŞ VEYA BULUNMAYAN BİR YOL GİRİLDİĞİNDE YÖNLENDİRDİĞİMİZ SAYFA */}
                <h5 style={{color:"red", fontWeight:"bold", textDecoration:"underline"}}>ARADIĞINIZ SAYFA BULUNAMADI !</h5>
            </div>
        )
    }
}
