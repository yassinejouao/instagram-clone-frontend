import { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { AuthContext } from "../contexts/AuthContext/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";
import Intercept from "../Tools/refrech";

function Rightbar() {
  const { user, dispatch } = useContext(AuthContext);
  const [Followings, setFollowings] = useState([]);
  const username = user.data.username;
  const axiosJWT = axios.create();
  Intercept(axiosJWT);
  useEffect(() => {
    const getFollowings = async () => {
      try {
        const FollowingsList = await axios.get(
          "http://localhost:8000/api/user/followings/" + username
        );

        setFollowings(FollowingsList.data.followings);
      } catch (e) {}
    };
    getFollowings();
  }, [username]);
  return (
    <RightbarContainer>
      <div className="rightbarWrapper">
        <span className="rightbarFollowingTitle">Followings</span>
        <div className="rightbarFollowings">
          {Followings.map((f) => (
            <div key={f._id} className="rightbarFollowing">
              <div className="rightbarfollowingLeft">
                <Link
                  style={{ textDecoration: "none", color: "#000000" }}
                  to={"/profile/" + f.username}
                >
                  <img
                    src={f.profilePicture}
                    alt=""
                    className="rightbarFollowingImg"
                  />
                </Link>
                <span className="rightbarFollowingName">{f.username}</span>
              </div>
              <div className="rightbarfollowingRight">
                <span
                  className="rightbarFollowingAction"
                  onClick={async () => {
                    await axiosJWT.put(
                      `http://localhost:8000/api/user/${f.username}/unfollow`,
                      {},
                      {
                        headers: {
                          Authorization: "Bearer " + user.accessToken,
                        },
                      }
                    );
                    dispatch({ type: "UNFOLLOW", payload: f._id });
                  }}
                >
                  UnFollow
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </RightbarContainer>
  );
}

const RightbarContainer = styled.div`
  width: 300px;
  height: calc(100vh - 63px);
  overflow: scroll;
  position: sticky;
  top: 51px;
  padding-left: 10px;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    width: 3px;
  }
  ::-webkit-scrollbar-track {
    background-color: #f1f1f1;
  }
  ::-webkit-scrollbar-thumb {
    background-color: rgb(192, 192, 192);
  }
  .rightbarWrapper {
    padding: 10px 10px;
  }
  .rightbarFollowingTitle {
    padding-left: 10px;
    font-size: 18px;
    font-weight: bold;
  }
  .rightbarFollowings {
    display: flex;
    padding-top: 5px;
    flex-direction: column;
  }
  .rightbarFollowing {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 5px;
  }
  .rightbarfollowingLeft {
    display: flex;
    align-items: center;
  }
  .rightbarFollowingImg {
    padding-left: 5px;
  }
  .rightbarFollowingName {
    padding-left: 10px;
  }
  .rightbarFollowingImg {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
    cursor: pointer;
  }
  .rightbarFollowingName {
    font-size: 15px;
    font-weight: bold;
  }
  .rightbarfollowingRight {
    display: flex;
  }
  .rightbarFollowingAction {
    font-size: 18px;
    color: rgb(0, 149, 246);
    cursor: pointer;
  }
  .rightbarFollowingAction:hover {
    font-size: 18px;
    font-weight: 500;
    color: rgb(0, 149, 246);
    cursor: pointer;
  }
  @media (max-width: 780px) {
    display: none;
  }
`;
export default Rightbar;
