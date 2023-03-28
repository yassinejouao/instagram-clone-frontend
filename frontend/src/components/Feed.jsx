import { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Post from "./Post";
import axios from "axios";
import { SpinnerDotted } from "spinners-react";
import Intercept from "../Tools/refrech";
import { AuthContext } from "../contexts/AuthContext/AuthContext";

function Feed(props) {
  const { user } = useContext(AuthContext);
  const [loadingNewPosts, setLoadingNewPosts] = useState(true);
  const [currPage, setCurrPage] = useState(1);
  const [prevPage, setPrevPage] = useState(0);
  const [posts, setPosts] = useState([]);
  const listInnerRef = useRef();
  const [wasLastList, setWasLastList] = useState(false);

  const axiosJWT = axios.create();

  Intercept(axiosJWT);
  useEffect(() => {
    if (props.rerenderFeed === 1) {
      setCurrPage(1);
      setPrevPage(0);
      setPosts([]);
      setWasLastList(false);
    }
    props.onChange(0);
    const fetchPosts = async () => {
      const res = await axiosJWT.get(
        `http://localhost:8000/api/article/timeline?page=${currPage}`,
        { headers: { Authorization: "Bearer " + user.accessToken } }
      );
      if (res.data.Articles.length === 1) {
        setWasLastList(true);
        setLoadingNewPosts(false);
      }
      if (!res.data.Articles.length) {
        setWasLastList(true);
        setLoadingNewPosts(false);
        return;
      }
      setPrevPage(currPage);
      const sortedPost = [...posts, ...res.data.Articles].sort((p1, p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      });
      setPosts(sortedPost);
    };
    if (!wasLastList && prevPage !== currPage) {
      fetchPosts();
    }
  }, [
    currPage,
    wasLastList,
    prevPage,
    posts,
    loadingNewPosts,
    axiosJWT,
    user.accessToken,
    props,
  ]);
  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + clientHeight === scrollHeight) {
        setCurrPage(currPage + 1);
      }
    }
  };
  return (
    <>
      <FeedContainer>
        <div onScroll={onScroll} ref={listInnerRef} className="FeedWrapper">
          {posts.map((p) => (
            <Post
              key={p._id}
              post={p}
              rerenderFeed={props.rerenderFeed}
              onChange={props.onChange}
            ></Post>
          ))}
          {loadingNewPosts && (
            <center>
              <SpinnerDotted color="rgb(0,149,246)" />
            </center>
          )}
        </div>
      </FeedContainer>
    </>
  );
}

const FeedContainer = styled.div`
  width: 500px;
  .FeedWrapper {
    height: calc(100vh - 63px);
    overflow-y: auto;
    padding: 5px;
    ::-webkit-scrollbar {
      width: 0px;
    }
    ::-webkit-scrollbar-track {
      background-color: #f1f1f1;
    }
    ::-webkit-scrollbar-thumb {
      background-color: rgb(192, 192, 192);
    }
  }
`;

export default Feed;
