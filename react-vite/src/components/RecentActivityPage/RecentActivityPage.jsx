import './RecentActivityPage.css'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getPayments, getPaymentsToMe } from '../../redux/payment'
import { getAllExpenses } from '../../redux/expense'
import { getAllUsers } from '../../redux/session'

function inboundHelper2(payment, users, expenses) {
    let string; 
    let amount = payment.amount; 
    let expense = expenses.find((expense) => expense.id == payment.expense_id);
    let thing = expense.name;
    let name = users[payment.user_id].first_name;
    
    string = `${name} paid you ${amount} for ${thing}`;
    return string;
}

function inboundPaymentHelper(payments, users, expenses) {
    let ul = (
        <ul>
            {payments.map(payment => {
                return <li key={payment.id}><NavLink to={`/expenses/${payment.expense_id}`}>{inboundHelper2(payment, users, expenses)}</NavLink></li>
            })}
        </ul>
    );
    return ul;
}


function helper2 (payment, users, expenses) {
    let string; 
    let amount = payment.amount; 
    let expense = expenses.find((expense) => expense.id == payment.expense_id);
    // console.log(".find returns: ", expense);
    // console.log("users reading as: ", users);
    // console.log(expenses);
    // console.log(expense.id);
    // console.log(payment.expense_id);
    let thing = expense.name; 
    let name = users[expense.owner_id].first_name; 

    string = `You paid ${name} $${amount} for ${thing}`

    return string;
}

function helper (paymentArray, usersObj, expenseArr) {
    // console.log({"payments": paymentArray, "usersObj": usersObj, "expenses": expenseArr});
    // return;
    let payments = paymentArray;
    let users = usersObj;
    let expenses = expenseArr;

    let ul = (
        <ul>
            {payments.map(payment => {
                return <li key={payment.id}><NavLink to={`/expenses/${payment.expense_id}`}>{helper2(payment, users, expenses)}</NavLink></li>
            })}
        </ul>
    )
    return ul;
}

function findMyExpenses(expenses, currentId) {
    console.log("helper func expenses = ", expenses);
    let myExpenses = expenses.filter((expense) => expense.owner_id === currentId);
    return myExpenses;
}


function RecentActivityPage() {
    const dispatch = useDispatch();
    // const currentuser = 
    const [myDone, setMyDone] = useState(false);
    const [allDone, setAllDone] = useState(false);
    const [myPayments, setMyPayments] = useState([]);
    const [expenses, setExpenses] = useState([]);
    // const [expensesIOwn, setExpensesIOwn] = useState([]);
    const [users, setUsers] = useState({});
    const [payments2me, setPayments2me] = useState([]);

    const currentUser = useSelector(state => state.session.user);
    const paymentState = useSelector(state => state.payment); 
    const expenseState = useSelector(state => state.expense.root_expenses);
    const userState = useSelector(state => state.session.users);


    useEffect(() => {
        dispatch(getPayments()); 
        dispatch(getAllExpenses());
        dispatch(getAllUsers());
    }, [dispatch]); 


    useEffect(() => {
        if (Object.keys(expenseState).length  > 0 && !allDone) {
            setExpenses(Object.values(expenseState));
            setUsers(userState);
            // then query for payments2me info?
            if (expenses.length > 0) {
                setAllDone(true);
            } 
        }
    },[expenseState, userState]);

    useEffect(() => {
        // setTimeout(() => {
            if (paymentState.payments.length > 0 && !myDone) {
                // console.log(paymentState);
                setMyPayments(paymentState.payments);
                // console.log(myPayments);
                setMyDone(true);
            }
        // }, 20);
    }, [paymentState]);

    useEffect(() => {
        // console.log("Status check--");
        // console.log("myDone = ", myDone);
        // console.log("allDone = ", allDone);
        if (myDone && allDone) {
            // console.log("expenses = ", expenses);
            // setTimeout(() => {
                if (expenses.length > 0) {
                    let myExpenses = findMyExpenses(expenses, currentUser.id);
                    // console.log(myExpenses);
                    dispatch(getPaymentsToMe(myExpenses));
                    // console.log(paymentState);
                }
        }
        
    }, [myDone, allDone]);

    useEffect(() => {
        if (myDone && allDone && paymentState.inboundPayments.length > 0) {
            setPayments2me(paymentState.inboundPayments);
            console.log("payments2me = ", payments2me);
        }
    }, [paymentState]);


    // console.log("pre-return users = ", users);
    if (!Object.keys(users).length) return (<p>loading</p>);

    return (
        <>
            <div className='outer-div-recent-activity'>
                <div className='left-activity'>
                    <h3>My Payments</h3>
                    {!myDone && !allDone ? <p>loading</p> :
                        <div className='out-div-my-payments'>
                        {helper(myPayments, users, expenses)}
                        </div>
                    }
                </div>
                
                <div className='right-activity'>
                    <h3>Paid to Me</h3>
                    {!(payments2me.length > 0) ? <p>no recent payments made to you </p> : 
                        <div className='inbound-payments-div'>
                            {inboundPaymentHelper(payments2me, users, findMyExpenses(expenses, currentUser.id))}
                        </div>
                    }
                </div>
            </div>
        </>
    )
}


export default RecentActivityPage