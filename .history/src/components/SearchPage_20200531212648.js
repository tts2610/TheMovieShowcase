import React from "react";
import { MDBCol } from "mdbreact";

export default function SearchPage() {
  return (
    <MDBCol md="6">
      <div className="active-pink-3 active-pink-4 mb-4">
        <input
          className="form-control"
          type="text"
          placeholder="Search"
          aria-label="Search"
        />
      </div>
    </MDBCol>
  );
}
