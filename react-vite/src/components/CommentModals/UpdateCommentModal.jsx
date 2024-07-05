import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkUpdateComment } from "../../redux/comment";
import "./CommentModal.css";

export default function UpdateCommentModal({ commentId }) {
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  function handleUpdate() {
    dispatch(thunkUpdateComment(commentId, "testing update comment"));
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
