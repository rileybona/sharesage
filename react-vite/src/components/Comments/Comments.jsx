import OpenModalButton from "../OpenModalButton/OpenModalButton";
import PostCommentModal from "../CommentModals/PostCommentModal";
import UpdateCommentModal from "../CommentModals/UpdateCommentModal";
import DeleteCommentModal from "../CommentModals/DeleteCommentModal";
import { useEffect } from "react";
import { thunkGetComments } from "../../redux/comment";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import "./Comments.css";

function Comments() {
  const dispatch = useDispatch();
  const { expenseId } = useParams();
  const userComments = useSelector((state) => state?.comment?.comments);
  const userSession = useSelector((state) => state?.session?.user);

  useEffect(() => {
    dispatch(thunkGetComments(expenseId));
  }, [dispatch, expenseId]);

  return (
    <div id="comments">
      <p className="font-bold text-lg m-2">Comments</p>

      <OpenModalButton
        className="post-comment-button"
        buttonText="Post your comment"
        modalComponent={<PostCommentModal expenseId={expenseId} />}
      />
      {userComments
        ?.sort((a, b) => {
          const a_dateString = new Date(a.created_at).getTime();
          const b_dateString = new Date(b.created_at).getTime();
          return a_dateString - b_dateString;
        })
        ?.map((comment, i) => (
          <div className="my-3 p-2 bg-gray-100 rounded-lg" key={i}>
            <p className="text-gray-400 m-2">
              Created {comment?.created_at?.slice(0, -13)} by{" "}
              {comment?.user?.first_name}
            </p>
            <div className="comment-body">{comment?.text}</div>
            {comment.user_id == userSession.id && (
              <div className="flex gap-3 m-2">
                <OpenModalButton
                  buttonText="Update"
                  modalComponent={
                    <UpdateCommentModal commentId={comment?.id} />
                  }
                />
                <OpenModalButton
                  buttonText="Delete"
                  modalComponent={
                    <DeleteCommentModal commentId={comment?.id} />
                  }
                />
              </div>
            )}
          </div>
        ))}
    </div>
  );
}

export default Comments;
