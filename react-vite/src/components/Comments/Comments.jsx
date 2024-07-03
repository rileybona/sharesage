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
          <div className="comment-header">date by FirstName</div>
          <div className="comment-body">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatem, cumque! Molestiae natus excepturi explicabo labore assumenda, expedita animi minima aliquam voluptatem aperiam neque qui omnis nihil obcaecati ullam provident odio.</div>
          <div className="comment-buttons">
            <button>Update</button><button>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Comments;
