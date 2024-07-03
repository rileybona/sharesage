// LABELS
const GET_ALL_EXPENSES = "expenses/GET_ALL_EXPENSES";
const GET_EXPENSE_DETAILS = "expenses/GET_EXPENSE_DETAILS";

// ACTION CREATORS
export const loadExpenses = (expenses) => ({
  type: GET_ALL_EXPENSES,
  payload: expenses,
});

export const loadSingleExpense = (expense) => ({
  type: GET_EXPENSE_DETAILS,
  payload: expense,
});

// THUNKS - -  - -- - --  - - -- -
export const getAllExpenses = () => async (dispatch) => {
  try {
    const response = await fetch("/api/expenses/");
    if (response.ok) {
      const res = await response.json();
      const expenses = res.expenses;
      dispatch(loadExpenses(expenses));
    } else {
      throw new Error("failed to get expenses");
    }
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const getSingleExpense = (expenseId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/expenses/${expenseId}`);

    if (response.ok) {
      await response.json().then((res) => dispatch(loadSingleExpense(res)));
    } else {
      throw new Error(`failed to get expense ${expenseId}`);
    }
  } catch (err) {
    console.log(err);
    return err;
  }
};
// REDUCER
const expenseReducer = (
  state = { root_expenses: {}, expense_details: {} },
  action
) => {
  switch (action.type) {
    case GET_ALL_EXPENSES: {
      const root_expenses = {};
      action.payload.forEach((expense) => {
        root_expenses[expense.id] = expense;
      });
      return { ...state, root_expenses };
    }

    case GET_EXPENSE_DETAILS: {
      state.expense_details = { [action.payload.id]: action.payload };
      return state;
    }

    default:
      return state;
  }
};

export default expenseReducer;
