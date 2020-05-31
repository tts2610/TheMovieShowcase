import React from "react";
import { Tab, Container, Row, Col, Nav } from "react-bootstrap";

export default function Tab() {
  return (
    <div>
      <Nav.Item>
        <Nav.Link eventKey="first">Tab 1</Nav.Link>
      </Nav.Item>
    </div>
  );
}
