import React from "react";
import { Nav } from "react-bootstrap";

export default function TabItem({ tabId, tabValue }) {
  return (
    <div>
      <Nav.Item>
        <Nav.Link eventKey={tabItem}>{tabItem}</Nav.Link>
      </Nav.Item>
    </div>
  );
}
