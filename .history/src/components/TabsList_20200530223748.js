import React from "react";
import { Nav } from "react-bootstrap";
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

  for (const [key, value] of Object.entries(categoryList)) {
    tabItemList.push(<TabItem tabId={key} tabValue={value} />);
  }
  return (
    <div>
      <Nav variant="pills" className="flex-column">
        {tabItemList}
      </Nav>
    </div>
  );
}
