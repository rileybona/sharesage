import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkDeleteComment } from "../../redux/comment";
import "./CommentModal.css";

export default function DeleteCommentModal({ commentId }) {
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  function handleDelete() {
    dispatch(thunkDeleteComment(commentId));
    closeModal();
  }

  return (
    <div id="comment-modal">
      <h1>Delete your comment?</h1>
      <div className="comment-modal-buttons">
        <button className="modal-button delete" onClick={handleDelete}>
          DELETE
        </button>
        <button className="modal-button" onClick={closeModal}>
          CANCEL
        </button>
      </div>
    </div>
  );
}
