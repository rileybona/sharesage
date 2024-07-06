const GET_PAYMENT = "payment/getPayment";
const ADD_PAYMENT = "payment/addPayment";
const GET_INBOUND_PAYMENTS = "payment/getInboundPayments";

const addPayment = (payment) => {
  return {
    type: ADD_PAYMENT,
    payment,
  };
};

const getPayment = (payment) => {
  return {
    type: GET_PAYMENT,
    payment,
  };
};

const getInboundPayments = (payments) => {
  return {
    type: GET_INBOUND_PAYMENTS,
    payload: payments,
  };
};

export const getPaymentsToMe = (expensesIOwn) => async (dispatch) => {
  console.log("getpayments2me thunk receiving expenses: ", expensesIOwn);
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
    } catch (err) {
      console.log(err);
      return err;
    } finally {
      // dispatch return array
      console.log("return Arryay! = ", returnArray);
      // eslint-disable-next-line no-unsafe-finally
      return dispatch(getInboundPayments(returnArray));
    }
  });
};

export const getPayments = (expense_id) => async (dispatch) => {
  let response;
  if (expense_id) {
    response = await fetch(`/api/expenses/${expense_id}/payments`);
  } else {
    response = await fetch(`/api/payments/current`);
  }

  if (response.ok) {
    const payment = await response.json();
    return dispatch(getPayment(payment));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages;
  } else {
    return { server: "Something went wrong. Please try again" };
  }
};

export const addAPayment = (data, expense_id) => async (dispatch) => {
  console.log(JSON.stringify(data));
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
const initialState = { payments: [], payment: {} };

const paymentReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_PAYMENT:
      newState = {
        ...state,
        payments: action.payment,
      };
      return newState;
    case GET_INBOUND_PAYMENTS:
      newState = {
        ...state,
        inboundPayments: action.payload,
      };
      return newState;
    case ADD_PAYMENT:
      newState = {
        ...state,
        payment: { [action.payment.id]: action.payment },
      };
      return newState;
    default:
      return state;
  }
};

export default paymentReducer;
