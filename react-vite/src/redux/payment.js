const ADD_PAYMENT = "payment/addPayment"

const addPayment = (payment) => {
    return {
        type: ADD_PAYMENT,
        payment
    }
}

export const addAPayment = (data) => async dispatch => {
    console.log(JSON.stringify(data))
    const response = await fetch("/api/payment/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })

    if (response.ok) {
        const expense = await response.json();
        return dispatch(addExpense(expense))
    } else if (response.status < 500) {
        const errorMessages = await response.json();
        return errorMessages
      } else {
        return { server: "Something went wrong. Please try again" }
      }
};
