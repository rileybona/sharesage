import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useModal } from "../../context/Modal";
import { thunkUpdateComment } from "../../redux/comment";
import "./CommentModal.css";

export default function UpdateCommentModal({ commentId }) {
  const existingComments = useSelector((state) => state.comment.comments);
  const user = useSelector((state) => state.session.user);
  const myCurrentComment = existingComments.find((c) => (c.user_id = user.id));
  const { closeModal } = useModal();
  const [comment, setComment] = useState(myCurrentComment.text);
  const dispatch = useDispatch();

  function handleUpdate() {
    dispatch(thunkUpdateComment(commentId, comment));
    closeModal();
  }

  return (
    <div id="comment-modal">
      <h1>Update your comment?</h1>
      <textarea
        name="post-comment-body"
        id="post-comment-area"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <div className="comment-modal-buttons">
        <button className="modal-button" onClick={handleUpdate}>
          UPDATE
        </button>
        <button className="modal-button" onClick={closeModal}>
          CANCEL
        </button>
      </div>
    </div>
  );
}
