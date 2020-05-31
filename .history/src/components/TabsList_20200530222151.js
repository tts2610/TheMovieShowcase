import React from "react";
import { Tab, Container, Row, Col, Nav } from "react-bootstrap";

export default function TabsList({ categories }) {
  return (
    <div>
      <Nav variant="pills" className="flex-column">
        <Nav.Item>
          <Nav.Link eventKey="second">Tab 2</Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
}
