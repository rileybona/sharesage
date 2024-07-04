import { useEffect, useState } from "react";
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
  const userComments = useSelector((state) => state?.comment?.comments);
  const userSession = useSelector((state) => state?.session?.user);
  const [userCommented, setUserCommented] = useState()

  useEffect(() => {
    dispatch(thunkGetComments(expenseId));
  }, [dispatch, expenseId]);

  useEffect(() => {
    setUserCommented(userComments?.find(c => c.user_id == userSession.id))
  }, [userComments])

  function handlePost(expenseId) {
    dispatch(thunkPostComment(expenseId, "This is my test template POST comment!"))
    console.log('my post posted', expenseId)
  }

  function handleUpdate(commentId) {
    dispatch(thunkUpdateComment(commentId, "This is my test template UPDATE comment!"))
    console.log('my post updated', commentId)
  }

  function handleDelete(commentId) {
    dispatch(thunkDeleteComment(commentId))
  }

  return (
    <div id="comments">
      <h1>Comments</h1>
      { !userCommented && <button onClick={() => handlePost(expenseId)}>Post your comment</button> }
      {userComments?.map((comment, i) => (
        <div className="comment" key={i}>
          <div className="comment-header">Created {comment?.created_at?.slice(0, -13)} by {comment?.user?.first_name}</div>
          <div className="comment-body">{comment?.text}</div>
          { comment.user_id == userSession.id && (
            <div className="comment-buttons">
              <button onClick={() => handleUpdate(comment?.id)}>Update</button>
              <button onClick={() => handleDelete(comment?.id)}>Delete</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Comments;
