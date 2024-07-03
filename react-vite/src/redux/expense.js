import { csrfFetch } from "./csrf";

// LABELS
export const GET_ALL_EXPENSES = 'expenses/GET_ALL_EXPENSES'

// ACTION CREATORS
export const loadExpenses = (expenses) => ({
    type: GET_ALL_EXPENSES,
    payload: expenses
});

// THUNKS - -  - -- - --  - - -- -
export const getAllExpenses = () => async (dispatch) => {
    try {
        const response = await csrfFetch('/api/expenses');
        if (response.ok) {
            const res = await response.json();
            const expenses = res.expenses;

            dispatch(loadExpenses(expenses));
        } else {
            throw new Error("failed to get expenses")
        }
    } catch (err) {
        console.log(err);
        return err; 
    }
}


// REDUCER 
const expenseReducer = (state = {}, action) => {
    switch(action.type) {
        case GET_ALL_EXPENSES: {
            const newState = {}
            action.expenses.forEach((expense) => {
                newState[expense.id] = expense;
            });
            return newState;
        }
        default: return state;
    }
}


export default expenseReducer