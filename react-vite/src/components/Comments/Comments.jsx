import { useState, useEffect } from "react";
import {
  thunkGetComments,
  thunkPostComment,
  thunkUpdateComment,
  thunkDeleteComment,
} from "../../redux/comment";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import "./Comments.css";

function Comments() {
  const dispatch = useDispatch();
  const { expenseId } = useParams();
  const userComments = useSelector((state) => state.comment.comments);

  useEffect(() => {
    dispatch(thunkGetComments(expenseId));
  }, [expenseId]);

  return (
    <div>
      <h1>Testing</h1>
      {userComments?.map((comment, i) => (
        <div key={i}>{JSON.stringify(comment)}</div>
      ))}
    </div>
  );
}

export default Comments;
