import React from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";

export default function Tab({ tabItem }) {
  return (
    <div>
      <Nav.Item>
        <Nav.Link eventKey={tabItem}>{tabItem}</Nav.Link>
      </Nav.Item>
    </div>
  );
}
