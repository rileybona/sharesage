import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useNavigate } from "react-router-dom";
import "./CommentModal.css";

export default function DeleteCommentModal() {
  const { closeModal } = useModal();
  //verification for auth checking should be done before this modal component:
  //  namely, on the expense details page.
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.session.user);

  function handleDelete() {
    console.log("the comment deleted and modal closed");
  }

  return (
    <div id="comment-modal">
      <h2>Are you sure you want to delete this comment?</h2>
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
