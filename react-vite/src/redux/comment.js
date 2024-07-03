const GET_COMMENTS = 'comment/getComments';
const POST_COMMENT = 'comment/postComment';
const UPDATE_COMMENT = 'comment/updateComment';
const DELETE_COMMENT = 'comment/deleteComment';



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
