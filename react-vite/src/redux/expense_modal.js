const ADD_EXPENSE = "expenseModal/addExpense"

const addExpense = (expense) => {
    return {
        type: ADD_EXPENSE,
        expense
    }
}

export const addAnExpense = (data) => async dispatch => {
    console.log(JSON.stringify(data))
    const response = await fetch("/api/expenses/", {
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


// Reducer
const initialState = { expense: {}}

const expenseModalReducer = (state = initialState, action) => {
    let newState;
    switch(action.type) {
        case ADD_EXPENSE:
            newState = {
                ...state,
                expense: {[action.expense.id] : action.expense}
            }
            return newState
        default:
            return state;
    }
}

export default expenseModalReducer;
