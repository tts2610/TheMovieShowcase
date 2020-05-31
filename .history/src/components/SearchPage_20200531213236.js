import React from "react";
import { MDBCol, MDBFormInline, MDBIcon } from "mdbreact";

export default function SearchPage() {
  return (
    <div className="input-group md-form form-sm form-1 pl-0 mt-5 ">
      <div className="input-group-prepend">
        <span className="input-group-text purple lighten-3" id="basic-text1">
          <MDBIcon className="text-white" icon="search" />
        </span>
      </div>
      <input
        className="form-control my-0 py-1"
        type="text"
        placeholder="Search"
        aria-label="Search"
      />
    </div>
  );
}
