import React from "react";
import { Nav } from "react-bootstrap";

export default function TabItem({ tabId, tabValue }) {
  return (
    <div>
      <Nav.Item key={tabId}>
        <Nav.Link eventKey={tabId} className="navItem">
          {tabValue}
        </Nav.Link>
      </Nav.Item>
    </div>
  );
}
