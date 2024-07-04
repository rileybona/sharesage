import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import expenseModalReducer from "./expense_modal";
import commentReducer from "./comment";
import expenseReducer from "./expense";
import paymentReducer from "./payment";

const rootReducer = combineReducers({
  session: sessionReducer,
  expenseModal: expenseModalReducer,
  comment: commentReducer,
  expense: expenseReducer,
  payment: paymentReducer
});

let enhancer;
if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
