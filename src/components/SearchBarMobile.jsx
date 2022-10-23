import React from "react";
import Backdrop from "./UI/Backdrop";
import { AiOutlineSearch } from "react-icons/ai";
import styled from "styled-components";

function SearchBarMobile(props) {
  return (
    <>
      {/* <Backdrop onClose={props.hidebar} /> */}
      <SearchBarMobileContainer>
        <div className="searchbar">
          <AiOutlineSearch className="SearchIcon" />
          <input
            onChange={props.searchHandler}
            type="text"
            className="searchInput"
            placeholder="Search"
          />
        </div>
      </SearchBarMobileContainer>
    </>
  );
}

const SearchBarMobileContainer = styled.div`
  display: flex;
  background-color: aliceblue;
  height: 50px;
  width: 100%;
  top: 0;
  z-index: 30;
  position: fixed;
  .searchbar {
    width: 100%;
    height: 100%;
    background-color: rgb(218, 218, 218);
    border-radius: 10px;
    display: flex;
    align-items: center;
  }
  .searchInput {
    border: none;
    width: 70%;
    background-color: rgb(218, 218, 218);

    &:focus {
      outline: none;
    }
  }
`;

export default SearchBarMobile;
