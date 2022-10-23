import axios from "axios";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { NotificationManager } from "react-notifications";
import { AuthContext } from "../contexts/AuthContext/AuthContext";
import Intercept from "../Tools/refrech";

function ShowPost(props) {
  const { user } = useContext(AuthContext);
  const [yourComment, setYourComment] = useState(null);
  const [comments, setComments] = useState([]);
  const axiosJWT = axios.create();
  Intercept(axiosJWT);
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const submitData = {};
      submitData.articleId = props.post._id;
      submitData.description = yourComment;
      await axiosJWT.post("http://localhost:8000/api/comment/", submitData, {
        headers: { Authorization: "Bearer " + user.accessToken },
      });
      const newComment = {};
      newComment.username = user.data.username;
      newComment.userPicture = user.data.profilePicture;
      newComment.description = submitData.description;
      newComment._id = Math.random();
      setComments((comments) => [newComment, ...comments]);
      props.newComment();
      NotificationManager.success("Success", "Comment has been created", 3000);
    } catch (error) {
      NotificationManager.error("Error", "Warning", 3000);
    }
  };
  useEffect(() => {
    const fetchComment = async () => {
      const res = await axios.get(
        `http://localhost:8000/api/comment/${props.post._id}`
      );

      res.data.comments.forEach(async (comment) => {
        const res = await axios.get(
          `http://localhost:8000/api/user/${comment.user}`
        );
        comment.username = res.data.user.username;
        comment.userPicture = res.data.user.profilePicture;
        setComments((comments) => [comment, ...comments]);
      });
    };
    fetchComment();
  }, [props.post._id]);
  return (
    <ShowPostContainer>
      <div className="addComment">
        <input
          className="addCommentInput"
          placeholder="Your Comment !"
          type="text"
          onChange={(e) => setYourComment(e.target.value)}
        />
        <button className="addCommentButton" onClick={submitHandler}>
          Add Comment
        </button>
      </div>
      <div className="showComments">
        {comments.map((comment) => (
          <div key={comment._id} className="oneComment">
            <div className="pictureUserCommentWrapper">
              <img className="pictureUser" src={comment.userPicture} alt="" />
            </div>
            <div className="usernameAndCommentWrapper">
              <span className="usernameComment">{comment.username}</span>
              <span className="Comment">{comment.description}</span>
            </div>
          </div>
        ))}
      </div>
    </ShowPostContainer>
  );
}
const ShowPostContainer = styled.div`
  margin: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .addComment {
    width: 100%;
    display: flex;
    justify-content: space-between;
    border: solid 1px #cecdcd;
    @media (max-width: 655px) {
      flex-direction: column;
    }
  }
  .addCommentInput {
    width: 70%;
    border: none;
    padding: 7px;
    border-radius: 5px;
    &:focus {
      outline: none;
    }
    @media (max-width: 655px) {
      width: 90%;
    }
  }
  .addCommentButton {
    border: none;
    padding: 7px;
    border-radius: 5px;
    background-color: #4a4b4b;
    color: white;
    margin: 5px;
  }
  .showComments {
    width: 100%;
    margin-top: 10px;
    height: 30vh;
    overflow-y: scroll;
    ::-webkit-scrollbar {
      width: 3px;
    }
    ::-webkit-scrollbar-track {
      background-color: #f1f1f1;
    }
    ::-webkit-scrollbar-thumb {
      background-color: rgb(192, 192, 192);
    }
  }
  .oneComment {
    display: flex;
    margin-bottom: 5px;
  }
  .usernameAndCommentWrapper {
    display: flex;
    flex-direction: column;
    margin-left: 5px;
    padding: 5px;
    border: solid 1px #cecdcd;
    border-radius: 10px;
    width: 100%;
  }
  .usernameComment {
    font-weight: bold;
  }
  .pictureUser {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
  }
`;
export default ShowPost;
