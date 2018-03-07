import React, { Component } from "react";
import { SearchBoxComponentStyle } from "./styled";

export class SearchBoxComponent extends Component {
  render() {
    return (
      <SearchBoxComponentStyle>
        <div className="form-inline float-right clearfix mb-5">
          <div className="input-group search-contract-list">
            <div className="input-group-prepend">
              <div className="input-group-text">
                <i className="handigo-icon handigo-icon-search" />
              </div>
            </div>
            <input className="form-control mr-sm-2 form-control-xl" type="search" placeholder="Search" aria-label="Search" />
          </div>
          <div className="buttons-admin">
            <button className="btn btn-sm btn-primary btn-search" type="button">
              Search
            </button>
          </div>
        </div>
      </SearchBoxComponentStyle>
    );
  }
}
