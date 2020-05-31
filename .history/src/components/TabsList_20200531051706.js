import React from "react";
import { Nav } from "react-bootstrap";
import TabItem from "./TabItem";

const categoryList = {
  popular: "popular",
  latest: "latest",
  now_playing: "now playing",
  top_rated: "top rated",
  upcoming: "upcoming",
};

export default function TabsList({ tabChanged }) {
  let tabItemList = [];

  for (const [key, value] of Object.entries(categoryList)) {
    tabItemList.push(
      <TabItem tabChanged={tabChanged} key={key} tabId={key} tabValue={value} />
    );
  }
  return (
    <div>
      <Nav fill variant="tabs" defaultActiveKey="popular">
        {tabItemList}
      </Nav>
    </div>
  );
}
