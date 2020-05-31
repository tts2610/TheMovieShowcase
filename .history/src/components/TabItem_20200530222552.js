import React from "react";
import { Nav } from "react-bootstrap";

export default function TabItem({ tabItem }) {
  return (
    <div>
      <Nav.Item>
        <Nav.Link eventKey={tabItem}>{tabItem}</Nav.Link>
      </Nav.Item>
    </div>
  );
}
