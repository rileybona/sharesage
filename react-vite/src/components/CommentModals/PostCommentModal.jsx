import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkPostComment } from "../../redux/comment";
import "./CommentModal.css";

export default function PostCommentModal({ expenseId }) {
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  function handlePost() {
    dispatch(thunkPostComment(expenseId, "testing post comment"));
    closeModal();
  }

  return (
    <div id="comment-modal">
      <h1>Post your comment!</h1>
      <textarea name="post-comment-body" id="post-comment-area" />
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
