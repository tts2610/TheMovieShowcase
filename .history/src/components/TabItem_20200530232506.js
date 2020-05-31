import React from "react";
import { Nav } from "react-bootstrap";

export default function TabItem({ tabId, tabValue, tabChanged }) {
  return (
    <div>
      <Nav.Item>
        <Nav.Link
          eventKey={tabId}
          onClick={tabChanged(tabId)}
          className="navItem"
        >
          {tabValue}
        </Nav.Link>
      </Nav.Item>
    </div>
  );
}
