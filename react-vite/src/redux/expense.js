// LABELS
const GET_ALL_EXPENSES = "expenses/GET_ALL_EXPENSES";
const GET_EXPENSE_DETAILS = "expenses/GET_EXPENSE_DETAILS";
const ADD_EXPENSE = "expense/ADD_EXPENSE";
const DELETE_EXPENSE = "expense/DELETE_EXPENSE";
const GET_PAYEES = "/expense/GET_PAYEES";
const GET_EXPENSE_PAYEES = "expense/GET_EXPENSE_PAYEES";
//add payees to expense doesn't need its own store action.
const UPDATE_EXPENSE = "expenses/UPDATE_EXPENSE";

// ACTION CREATORS
const loadExpenses = (expenses) => ({
  type: GET_ALL_EXPENSES,
  payload: expenses,
});

const loadSingleExpense = (expense) => ({
  type: GET_EXPENSE_DETAILS,
  payload: expense,
});

const addExpense = (expense) => {
  return {
    type: ADD_EXPENSE,
    payload: expense,
  };
};

const deleteExpense = (expenseId) => ({
  type: DELETE_EXPENSE,
  expenseId,
});

const getPayees = (payees) => {
  return {
    type: GET_PAYEES,
    payees,
  };
};

const fetchPayees = (payees) => {
  return {
    type: GET_EXPENSE_PAYEES,
    payload: payees,
  };
};

const updateExpense = (expense) => {
  return {
    type: UPDATE_EXPENSE,
    payload: expense,
  };
};

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

export const addAnExpense = (data) => async (dispatch) => {
  // console.log(JSON.stringify(data));
  const response = await fetch("/api/expenses/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const expense = await response.json();
    return dispatch(addExpense(expense));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages;
  } else {
    return { server: "Something went wrong. Please try again" };
  }
};

export const updateAnExpense = (id, expense) => async (dispatch) => {
  console.log(JSON.stringify(expense));
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(expense),
  };
  const response = await fetch(`/api/expenses/${id}`, options);
  if (response.ok) {
    const expense = await response.json();
    return dispatch(updateExpense(expense));
  } else {
    const error = await response.json();
    console.log(error);
    return { message: "Something went wrong" };
  }
};

export const getExpensePayees = (expenseId) => async (dispatch) => {
  const response = await fetch(`/api/expenses/${expenseId}/payees`)
    .then((res) => res.json().then((res) => res.payees))
    .catch((e) => console.log(e.message));
  if (response.length) {
    const payload = {};
    payload.payees = response.reduce((acc, el) => {
      acc[el.id] = el;
      return acc;
    }, {});
    payload.expenseId = expenseId;
    return dispatch(fetchPayees(payload));
  } else {
    return dispatch(fetchPayees({ expenseId, payees: null }));
  }
};

export const addExpensePayees = (expenseId, payload) => async (dispatch) => {
  const options = {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(`/api/expenses/${expenseId}/payees`, options);
  if (response.ok) {
    const response = await fetch(`/api/expenses/${expenseId}/payees`)
      .then((res) => res.json().then((res) => res.payees))
      .catch((e) => console.log(e.message));
    if (response.length) {
      const payload = {};
      payload.payees = response.reduce((acc, el) => {
        acc[el.id] = el;
        return acc;
      }, {});
      payload.expenseId = expenseId;
      return dispatch(getPayees(payload));
    } else {
      return dispatch(getPayees({ expenseId, payees: null }));
    }
  }
};

export const deleteAnExpense = (expenseId) => async (dispatch) => {
  console.log(`confirmed deleting expense ${expenseId}`);
  const options = {
    method: "DELETE",
  };
  const response = await fetch(`/api/expenses/${expenseId}`, options);
  if (response.ok) {
    dispatch(deleteExpense(parseInt(expenseId)));
    return 0;
  } else {
    return -1;
  }
};

export const getListOfPayees = () => async (dispatch) => {
  const response = await fetch(`/api/users/`);
  if (response.ok) {
    const payees = await response.json();
    dispatch(getPayees(payees));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages;
  } else {
    return { server: "Something went wrong. Please try again" };
  }
};

// REDUCER
const expenseReducer = (
  state = { root_expenses: {}, expense_details: {}, payees: [] },
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

    case ADD_EXPENSE: {
      state.expense_details = { [action.payload.id]: action.payload };
      return state;
    }

    case DELETE_EXPENSE: {
      if (state.root_expenses[action.expenseId]) {
        delete state.root_expenses[action.expenseId];
      }
      // state.expense_details[action.payload.id] = {};
      return state;
    }

    case GET_EXPENSE_PAYEES: {
      state.expense_details[action.payload.expenseId].payees =
        action.payload.payees;
      return state;
    }
    case GET_PAYEES: {
      state.payees = action.payees;
      return state;
    }

    default:
      return state;
  }
};

export default expenseReducer;
