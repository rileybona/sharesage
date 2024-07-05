import { useDispatch } from "react-redux";
import { useState } from "react";
import { useModal } from "../../context/Modal";
import { thunkPostComment } from "../../redux/comment";
import "./CommentModal.css";

export default function PostCommentModal({ expenseId }) {
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const [comment, setComment] = useState();
  const [validLength, setValidLength] = useState(true);

  function handlePost() {
    const validSubmission = comment?.length >= 5;

    setValidLength(validSubmission);
    if (validSubmission) {
      dispatch(thunkPostComment(expenseId, comment));
      closeModal();
    }
  }

  return (
    <div id="comment-modal">
      <h1>Post your comment!</h1>
      {!validLength && (
        <p className="error">Comment must be 5 characters or more.</p>
      )}
      <textarea
        name="post-comment-body"
        id="post-comment-area"
        onChange={(e) => setComment(e.target.value)}
      />
      <div className="comment-modal-buttons">
        <button className="modal-button" onClick={handlePost}>
          POST
        </button>
        <button className="modal-button" onClick={closeModal}>
          CANCEL
        </button>
      </div>
    </div>
  );
}
