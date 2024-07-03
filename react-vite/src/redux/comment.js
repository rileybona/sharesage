const GET_COMMENTS = "comment/getComments";
const POST_COMMENT = "comment/postComment";
const UPDATE_COMMENT = "comment/updateComment";
const DELETE_COMMENT = "comment/deleteComment";

const getComments = (expenseId) => ({
  type: GET_COMMENTS,
  payload: expenseId,
});

const postComment = (expenseId, commentBody) => ({
  type: POST_COMMENT,
  payload: { expenseId, commentBody },
});

const updateComment = (commentId, commentBody) => ({
  type: UPDATE_COMMENT,
  payload: { commentId, commentBody },
});

const deleteComment = (commentId) => ({
  type: DELETE_COMMENT,
  payload: commentId,
});

const initialState = { comments: null };

function commentReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COMMENTS:
      return { ...state, comments: action.payload };
    case POST_COMMENT:
      return { ...state, comments: action.payload };
    case UPDATE_COMMENT:
      return { ...state, comments: action.payload };
    case DELETE_COMMENT:
      return { ...state, comments: null };
    default:
      return state;
  }
}

export default commentReducer;
