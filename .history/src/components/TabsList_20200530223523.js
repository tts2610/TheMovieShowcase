import React from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import TabItem from "./TabItem";

const categoryList = {
  latest: "latest",
  now_playing: "now playing",
  popular: "popular",
  top_rated: "top rated",
  upcoming: "upcoming",
};

export default function TabsList() {
  let tabItemList = [];
  categoryList.forEach((category) => {
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
