import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkUpdateComment } from "../../redux/comment";
import "./CommentModal.css";

export default function UpdateCommentModal() {
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  function handleUpdate(commentId, commentText) {
    dispatch(thunkUpdateComment(commentId, commentText));
    closeModal();
  }

  return (
    <div id="comment-modal">
      <h1>Update your comment?</h1>
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
