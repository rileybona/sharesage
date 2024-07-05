import { useDispatch } from "react-redux";
import { useState } from "react";
import { useModal } from "../../context/Modal";
import { thunkUpdateComment } from "../../redux/comment";
import "./CommentModal.css";

export default function UpdateCommentModal({ commentId }) {
  const { closeModal } = useModal();
  const [comment, setComment] = useState();
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
