import React from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import TabItem from "./TabItem";

export default function TabsList({ categories }) {
  let tabItemList = [];
  categories.forEach((category) => {
    tabItemList.push(<TabItem tabItem={category} />);
  });
  return (
    <div>
      <Nav variant="pills" className="flex-column">
        {tabItemList}
      </Nav>
    </div>
  );
}
