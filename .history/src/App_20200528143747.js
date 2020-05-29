import React, { Component } from "react";
import "./App.css";
import { Alert } from "react-bootstrap";
const API_KEY = process.env.REACT_APP_APIKEY;

export default class App extends Component {
  render() {
    return (
      <>
        <Alert show={show} variant="success">
          <Alert.Heading>How's it going?!</Alert.Heading>
          <p>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula,
            eget lacinia odio sem nec elit. Cras mattis consectetur purus sit
            amet fermentum.
          </p>
          <hr />
          <div className="d-flex justify-content-end">
            <Button onClick={() => setShow(false)} variant="outline-success">
              Close me ya'll!
            </Button>
          </div>
        </Alert>

        {!show && <Button onClick={() => setShow(true)}>Show Alert</Button>}
      </>
    );
  }
}
