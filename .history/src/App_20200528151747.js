import React, { Component } from "react";
import "./App.css";
import { Alert } from "react-bootstrap";
import Card from "./components/Card";
const API_KEY = process.env.REACT_APP_APIKEY;

export default class App extends Component {
  render() {
    return (
      <>
        <Card />
      </>
    );
  }
}
