const GET_PAYMENT = "payment/getPayment"
const ADD_PAYMENT = "payment/addPayment"

const addPayment = (payment) => {
    return {
        type: ADD_PAYMENT,
        payment
    }
}

const getPayment = (payment) => {
    return {
        type: GET_PAYMENT,
        payment
    }
}

export const getPayments = (expense_id) => async dispatch => {
    let response;
    if (expense_id) {
        response = await fetch(`/api/expenses/${expense_id}/payments`)
    } else {
        response = await fetch(`/api/payments/current`)
    }

    if (response.ok) {
        const payment = await response.json();
        return dispatch(getPayment(payment))
    } else if (response.status < 500) {
        const errorMessages = await response.json();
        return errorMessages
      } else {
        return { server: "Something went wrong. Please try again" }
      }
}

export const addAPayment = (data, expense_id) => async dispatch => {
    console.log(JSON.stringify(data))
    const response = await fetch(`/api/expenses/${expense_id}/payments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })

    if (response.ok) {
        const payment = await response.json();
        return dispatch(addPayment(payment))
    } else if (response.status < 500) {
        const errorMessages = await response.json();
        return errorMessages
      } else {
        return { server: "Something went wrong. Please try again" }
      }
};

// Reducer
const initialState = { payments: [], payment: {}}

const paymentReducer = (state = initialState, action) => {
    let newState;
    switch(action.type) {
        case GET_PAYMENT:
            newState = {
                ...state,
                payments: action.payment
            }
            return newState;
        case ADD_PAYMENT:
            newState = {
                ...state,
                payment: {[action.payment.id] : action.payment}
            }
            return newState
        default:
            return state;
    }
}

export default paymentReducer;
