import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

function Search({ data, hideSearch }) {
  return (
    <SearchContainer>
      <div className="searchWrapper">
        <div className="users">
          {data?.users?.map((u) => (
            <Link
              style={{ textDecoration: "none" }}
              to={`/profile/${u.username}`}
              onClick={hideSearch}
            >
              <div key={u._id} className="user">
                <div className="userRight">
                  <img
                    src={
                      u.profilePicture
                        ? u.profilePicture
                        : "person/noAvatar.png"
                    }
                    alt=""
                    className="searchImg"
                  />
                </div>

                <div className="userLeft">
                  <span>{u.username}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </SearchContainer>
  );
}

const SearchContainer = styled.div`
  position: fixed;
  width: 100vw;
  top: 51px;
  display: flex;
  justify-content: center;

  @media (max-width: 655px) {
    left: -4px;
  }
  .searchWrapper {
    z-index: 3033;
    width: 400px;
    background-color: rgb(243, 243, 243);
    position: relative;
    border-radius: 0px 0px 13px 13px;
    -webkit-border-radius: 0px 0px 13px 13px;
    -moz-border-radius: 0px 0px 13px 13px;
    border: 3px solid #ebebeb;
    box-shadow: 0px 24px 41px -7px rgba(28, 28, 28, 0.41);
    -webkit-box-shadow: 0px 24px 41px -7px rgba(28, 28, 28, 0.41);
    -moz-box-shadow: 0px 24px 41px -7px rgba(28, 28, 28, 0.41);
  }
  .users {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .user {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .userRight {
    width: 20%;
  }
  .userLeft {
    width: 100%;
    > span {
      color: black;
    }
  }
  .searchImg {
    display: block;
    padding: 5px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
`;
export default Search;
