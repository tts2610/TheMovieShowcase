import React from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import TabItem from "./TabItem";

const categoryList = {
  1: "latest",
  2: "now_playing",
  3: "popular",
  4: "top_rated",
  5: "upcoming",
};

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
