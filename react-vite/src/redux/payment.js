import _ from "underscore";

const GET_PAYMENT = "payment/getPayment";
const ADD_PAYMENT = "payment/addPayment";

const GET_INBOUND_PAYMENTS = "payment/getInboundPayments";
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

export const getPayments = (expense_id) => async (dispatch) => {
  let response;
  if (expense_id) {
    response = await fetch(`/api/expenses/${expense_id}/payments`);
  } else {
    response = await fetch(`/api/payments/current`);
  }

  if (response.ok) {
    const payments = await response.json();
    return dispatch(getPayment(payments));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages;
  } else {
    return { server: "Something went wrong. Please try again" };
  }
};

export const addAPayment = (data, expense_id) => async (dispatch) => {
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
    case GET_INBOUND_PAYMENTS:
      newState = {
        ...state,
        user_payments: {
          ...state.user_payments,
          inbound: action.payments,
        },
      };
      return newState;
    case GET_OUTBOUND_PAYMENTS:
      newState = {
        ...state,
        user_payments: {
          ...state.user_payments,
          outbound: action.payments,
        },
      };
      return newState;
    default:
      return state;
  }
};

export default paymentReducer;
