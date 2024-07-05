import OpenModalButton from "../OpenModalButton/OpenModalButton";
import PostCommentModal from "../CommentModals/PostCommentModal";
import UpdateCommentModal from "../CommentModals/UpdateCommentModal";
import DeleteCommentModal from "../CommentModals/DeleteCommentModal";
import { useEffect, useState } from "react";
import { thunkGetComments } from "../../redux/comment";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import "./Comments.css";

function Comments() {
  const dispatch = useDispatch();
  const { expenseId } = useParams();
  const userComments = useSelector((state) => state?.comment?.comments);
  const userSession = useSelector((state) => state?.session?.user);
  const [userCommented, setUserCommented] = useState();

  useEffect(() => {
    dispatch(thunkGetComments(expenseId));
  }, [dispatch, expenseId]);

  useEffect(() => {
    setUserCommented(userComments?.find((c) => c.user_id == userSession.id));
  }, [userComments]);

  return (
    <div id="comments">
      <h1>Comments</h1>
      {!userCommented && (
        <OpenModalButton
          className="post-comment-button"
          buttonText="Post your comment"
          modalComponent={<PostCommentModal expenseId={expenseId} />}
        />
      )}
      {userComments?.map((comment, i) => (
        <div className="comment" key={i}>
          <div className="comment-header">
            Created {comment?.created_at?.slice(0, -13)} by{" "}
            {comment?.user?.first_name}
          </div>
          <div className="comment-body">{comment?.text}</div>
          {comment.user_id == userSession.id && (
            <div className="comment-buttons">
              <OpenModalButton
                buttonText="Update"
                modalComponent={<UpdateCommentModal commentId={comment?.id} />}
              />
              <OpenModalButton
                buttonText="Delete"
                modalComponent={<DeleteCommentModal commentId={comment?.id} />}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Comments;
