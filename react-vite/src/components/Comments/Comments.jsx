import { useEffect } from "react";
import {
  thunkGetComments,
  thunkPostComment,
  thunkUpdateComment,
  thunkDeleteComment,
} from "../../redux/comment";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import "./Comments.css";

function Comments() {
  const dispatch = useDispatch();
  const { expenseId } = useParams();
  const userComments = useSelector((state) => state.comment.comments);

  useEffect(() => {
    dispatch(thunkGetComments(expenseId));
  }, [dispatch, expenseId]);

  return (
    <div id="comments">
      <h1>Comments</h1>
      <button>Post your comment</button>
      {userComments?.map((comment, i) => (
        <div className="comment" key={i}>
          <div className="comment-header">Created {comment.created_at.slice(0, -13)} by {comment.user.first_name}</div>
          <div className="comment-body">{comment.text}</div>
          <div className="comment-buttons">
            <button>Update</button><button>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Comments;
