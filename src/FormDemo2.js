import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import alertify from "alertifyjs";

export default class FormDemo2 extends Component {
  // İletişim için hazırladımız component
  // alertifyjs ile eklediğimiz bilgileri gösterdik.

  state = { email: "", password: "", city: "", description: "" };

  handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    alertify.success(this.state.email + " mesajınız veritabanına eklendi!");
  };

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              onChange={this.handleChange}
            ></Input>
          </FormGroup>

          <FormGroup>
            <Label for="password">Şifre</Label>
            <Input
              type="password"
              name="password"
              id="password"
              onChange={this.handleChange}
            ></Input>
          </FormGroup>

          <FormGroup>
            <Label for="exampleText">
              Mesaj
            </Label>
              <Input type="textarea" name="text" id="exampleText" />
          </FormGroup>

          <FormGroup>
            <Label for="city">Şehir</Label>
            <Input
              type="select"
              name="city"
              id="city"
              onChange={this.handleChange}
            >
              <option>Ankara</option>
              <option>İstanbul</option>
              <option>Aksaray</option>
              <option>Kırklareli</option>
              <option>Kars</option>
            </Input>
          </FormGroup>
          <Button type="submit">Kaydet</Button>
        </Form>
      </div>
    );
  }
}
