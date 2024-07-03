const GET_COMMENTS = "comment/getComments";
const POST_COMMENT = "comment/postComment";
const UPDATE_COMMENT = "comment/updateComment";
const DELETE_COMMENT = "comment/deleteComment";

const getComments = (comment) => ({
  type: GET_COMMENTS,
  payload: comment
});

const postComment = (expenseId, comment) => ({
  type: POST_COMMENT,
  payload: { expenseId, comment },
});

const updateComment = (commentId, comment) => ({
  type: UPDATE_COMMENT,
  payload: { commentId, comment },
});

const deleteComment = (commentId) => ({
  type: DELETE_COMMENT,
  payload: commentId,
});

export const thunkGetComments = (expenseId) => async (dispatch) => {
	const response = await fetch(`/api/expenses/${expenseId}/comments`);

  if (response.ok) {
    const data = await response.json();
    dispatch(getComments(data));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages
  } else {
    return { server: "Something went wrong. Please try again" }
  }
};

export const thunkPostComment = (expenseId, comment) => async (dispatch) => {
  const response = await fetch(`/api/expenses/${expenseId}/comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ comment })
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(postComment(data));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages;
  } else {
    return { server: "Something went wrong. Please try again" };
  }
};

export const thunkUpdateComment = (commentId, comment) => async (dispatch) => {
  const response = await fetch(`/api/comments/${commentId}`, {
    method: 'UPDATE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ comment })
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(updateComment(data));
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
      return { ...state, comments: action.payload };
    case POST_COMMENT:
      return { ...state, comments: [...state?.comments, action.payload] };
    case UPDATE_COMMENT:
      const updatedComments = state.comments.map(comment =>
        comment.id === action.payload.id ? action.payload : comment
      );
      return { ...state, comments: updatedComments };
    case DELETE_COMMENT:
      return { ...state, comments: action.payload };
    default:
      return state;
  }
}

export default commentReducer;
