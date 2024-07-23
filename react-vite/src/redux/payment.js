import _ from "underscore";

const GET_PAYMENT = "payment/getPayment";
const ADD_PAYMENT = "payment/addPayment";
const GET_INBOUND_PAYMENTS = "payment/getInboundPayments";
const GET_USER_PAYMENTS = "payment/getUserPayments";
const CLEAR_PAYMENT = "payment/clearPayments"

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

const getInboundPayments = (payments) => {
  return {
    type: GET_INBOUND_PAYMENTS,
    payload: payments,
  };
};

const getUserPayments = (payments) => {
  return {
    type: GET_USER_PAYMENTS,
    payload: payments,
  };
};

const clearPayments = (payments) => {
  return {
    type: CLEAR_PAYMENT,
    payload: payments
  }
}

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

export const getCurrentUserPayments = (expenseIdsArr) => async (dispatch) => {
  if (expenseIdsArr.length)
    try {
      const paymentPromises = expenseIdsArr.map((id) =>
        fetch(`/api/expenses/${id}/payments`).then((response) => {
          if (!response.ok) {
            throw new Error(`Failed to fetch payments for expense ID ${id}`);
          }
          return response.json();
        })
      );

      const payments = await Promise.all(paymentPromises);

      dispatch(getUserPayments(payments));
    } catch (error) {
      console.error("Error fetching payments:", error);
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

export const clearAllPayments = () => async (dispatch) => {
  return dispatch(clearPayments(true))
}

// Reducer
const initialState = { payments: [], payment: {}, user_payments: [] };

const paymentReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_PAYMENT:
      newState = {
        ...state,
        payments: action.payments,
      };
      return newState;
    case GET_USER_PAYMENTS: {
      newState = { ...state };
      for (const arr of action.payload) {
        for (const i of arr) {
          if (_.findWhere(newState.user_payments, i) == null) {
            newState.user_payments.push(i);
          }
        }
      }
      return newState;
    }
    case GET_INBOUND_PAYMENTS:
      newState = {
        ...state,
        inboundPayments: action.payload,
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
      return newState
    default:
      return state;
  }
};

export default paymentReducer;
