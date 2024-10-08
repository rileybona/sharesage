// import _ from "underscore";

const GET_PAYMENT = "payment/getPayment";
const ADD_PAYMENT = "payment/addPayment";
const GET_INBOUND_PAYMENTS = "payment/getInboundPayments";
// const GET_USER_PAYMENTS = "payment/getUserPayments";
const CLEAR_PAYMENT = "payment/clearPayments";
const GET_OUTBOUND_PAYMENTS = "payment/getOutboundPayments";

const addPayment = (payment) => {
  return {
    type: ADD_PAYMENT,
    payment,
  };
};

const getPayment = (payments) => {
  return {
    type: GET_PAYMENT,
    payments,
  };
};

const getInboundPayments = (payments) => ({
  type: GET_INBOUND_PAYMENTS,
  payments,
});

const getOutboundPayments = (payments) => ({
  type: GET_OUTBOUND_PAYMENTS,
  payments,
});

export const getUserInboundPayments = () => async (dispatch) => {
  const response = await fetch("/api/payments/inbound");
  if (response.ok) {
    const payments = await response.json();
    return dispatch(getInboundPayments(payments));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages;
  } else {
    return { server: "Something went wrong. Please try again" };
  }
};

export const getUserOutboundPayments = () => async (dispatch) => {
  const response = await fetch("/api/payments/outbound");
  if (response.ok) {
    const payments = await response.json();
    return dispatch(getOutboundPayments(payments));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages;
  } else {
    return { server: "Something went wrong. Please try again" };
  }
};

// const getUserPayments = (payments) => {
//   return {
//     type: GET_USER_PAYMENTS,
//     payload: payments,
//   };
// };

const clearPayments = (payments) => {
  return {
    type: CLEAR_PAYMENT,
    payload: payments,
  };
};

export const getPaymentsToMe = (expensesIOwn) => async (dispatch) => {
  // console.log("getpayments2me thunk receiving expenses: ", expensesIOwn);
  // create return array
  let returnArray = [];
  // for each expense
  expensesIOwn.forEach(async (expense) => {
    try {
      // console.log("foreach, expense = ", expense);
      // console.log("foreach, id = ", expense.id);
      // fetch payments by expense id
      const response = await fetch(`/api/expenses/${expense.id}/payments`);

      // if fetch succeeds..
      if (response.ok) {
        const payments = await response.json();
        // spread previous values and new response into return array
        returnArray = [...returnArray, ...payments];
        // console.log("returnArray now = ", returnArray);
      } else {
        throw new Error(`failed to fetch payments for expense ${expense.id}`);
      }

      return dispatch(getInboundPayments(returnArray));
    } catch (err) {
      //   console.log(err);
      return err;
    }
    // finally {
    //   // dispatch return array
    //   console.log("return Arryay! = ", returnArray);
    //   // eslint-disable-next-line no-unsafe-finally
    //   return dispatch(getInboundPayments(returnArray));
    // }
  });
};

export const getPayments = (expense_id) => async (dispatch) => {
  let response;
  // console.log("~getPaymentsThunk: receiving ExpenseID of ", expense_id);
  if (expense_id) {
    response = await fetch(`/api/expenses/${expense_id}/payments`);
  } else {
    response = await fetch(`/api/payments/current`);
  }

  if (response.ok) {
    const payments = await response.json();
    // console.log("fetch returns :", payments);
    return dispatch(getPayment(payments));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    console.log(errorMessages)
    return errorMessages;
  } else {
    // console.log("~getPayments Thunk - fetch failed");
    return { server: "Something went wrong. Please try again" };
  }
};

export const addAPayment = (data, expense_id) => async (dispatch) => {
  // console.log("~addPayment thunk");
  // console.log(JSON.stringify(data));
  const response = await fetch(`/api/expenses/${expense_id}/payments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const payment = await response.json();
    return dispatch(addPayment(payment));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages;
  } else {
    return { server: "Something went wrong. Please try again" };
  }
};

export const clearAllPayments = () => async (dispatch) => {
  return dispatch(clearPayments(true));
};

// Reducer
const initialState = {
  payments: [],
  payment: {},
  user_payments: { inbound: [], outbound: [] },
};

const paymentReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_PAYMENT:
      newState = {
        ...state,
        payments: action.payments,
      };
      return newState;
    case ADD_PAYMENT:
      newState = {
        ...state,
        payments: [...state.payments, action.payment],
        payment: { [action.payment.id]: action.payment },
      };
      return newState;
    case CLEAR_PAYMENT:
      newState = initialState;
      return newState;
    case GET_OUTBOUND_PAYMENTS:
      newState = {
        ...state,
        user_payments: {
          inbound: state.user_payments.inbound,
          outbound: action.payments,
        },
      };
      return newState;
    case GET_INBOUND_PAYMENTS:
      newState = {
        ...state,
        user_payments: {
          inbound: action.payments,
          outbound: state.user_payments.outbound,
        },
      };
      return newState;
    default:
      return state;
  }
};

export default paymentReducer;
