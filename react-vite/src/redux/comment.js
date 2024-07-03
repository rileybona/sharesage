const GET_COMMENTS = "comment/getComments";
const POST_COMMENT = "comment/postComment";
const UPDATE_COMMENT = "comment/updateComment";
const DELETE_COMMENT = "comment/deleteComment";

// const processComments = async (comments) => {
//   const response = await fetch(`/api/users`);

//   if (response.ok) {
//     const users = await response.json();
//     for (let comment in comments) {
//       comment.user = users[comment.user_id]
//     }
//     console.log("comments =>>>>>>>>", comments)
//     return comments;
//   } else if (response.status < 500) {
//     const errorMessages = await response.json();
//     return errorMessages;
//   } else {
//     return { server: "Something went wrong. Please try again" };
//   }
// }

// const processComment = async (comment) => {
//   const response = await fetch(`/api/users/${comment.user_id}`);

//   if (response.ok) {
//     const user = await response.json();
//     comment.user = user
//     return comment;
//   } else if (response.status < 500) {
//     const errorMessages = await response.json();
//     return errorMessages;
//   } else {
//     return { server: "Something went wrong. Please try again" };
//   }
// }

const getComments = (comments) => ({
  type: GET_COMMENTS,
  comments,
});

const postComment = (comment) => ({
  type: POST_COMMENT,
  comment,
});

const updateComment = (commentId, comment) => ({
  type: UPDATE_COMMENT,
  commentId,
  comment,
});

const deleteComment = (commentId) => ({
  type: DELETE_COMMENT,
  commentId,
});

export const thunkGetComments = (expenseId) => async (dispatch) => {
  const response = await fetch(`/api/expenses/${expenseId}/comments`);

  if (response.ok) {
    const comments = await response.json();
    // const processedComments = await processComments(comments);
    dispatch(getComments(comments));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages;
  } else {
    return { server: "Something went wrong. Please try again" };
  }
};

export const thunkPostComment = (expenseId, comment) => async (dispatch) => {
  const response = await fetch(`/api/expenses/${expenseId}/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ comment }),
  });

  if (response.ok) {
    const newComment = await response.json();
    // const processedComment = await processComment(newComment);
    dispatch(postComment(newComment));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages;
  } else {
    return { server: "Something went wrong. Please try again" };
  }
};

export const thunkUpdateComment = (commentId, comment) => async (dispatch) => {
  const response = await fetch(`/api/comments/${commentId}`, {
    method: "UPDATE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ comment }),
  });

  if (response.ok) {
    const newComment = await response.json();
    // const processedComment = await processComment(newComment);
    dispatch(updateComment(commentId, newComment));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages;
  } else {
    return { server: "Something went wrong. Please try again" };
  }
};

export const thunkDeleteComment = (commentId) => async (dispatch) => {
  const response = await fetch(`/api/comments/${commentId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(deleteComment(commentId));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages;
  } else {
    return { server: "Something went wrong. Please try again" };
  }
};

const initialState = { comments: null };

function commentReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COMMENTS:
      return { ...state, comments: action.comments };
    case POST_COMMENT:
      return { ...state, comments: [...state?.comments, action.comment] };
    case UPDATE_COMMENT:
      const updatedComments = state.comments.map((comment) =>
        comment.id === action.commentId ? action.comment : comment
      );
      return { ...state, comments: updatedComments };
    case DELETE_COMMENT:
      const filteredComments = state.comments.filter(
        (comment) => comment.id !== action.commentId
      );
      return { ...state, comments: filteredComments };
    default:
      return state;
  }
}

export default commentReducer;