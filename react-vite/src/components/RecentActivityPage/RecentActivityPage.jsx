import './RecentActivityPage.css'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getPayments } from '../../redux/payment'
import { getAllExpenses } from '../../redux/expense'

function RecentActivityPage() {
    const dispatch = useDispatch();
    const [myDone, setMyDone] = useState(false);
    const [allDone, setAllDone] = useState(false);
    const [myPayments, setMyPayments] = useState([]);
    const [expenses, setExpenses] = useState([]);

    const paymentState = useSelector(state => state.payment); 
    const expenseState = useSelector(state => state.expense.root_expenses);
    const userState = 1;


    useEffect(() => {
        dispatch(getPayments()); 
        dispatch(getAllExpenses());
    }, [dispatch]); 

    useEffect(() => {
        setTimeout(() => {
            if (Object.keys(expenseState).length > 0 && Object.keys(paymentState).length > 0) {
                setMyPayments(Object.values(paymentState));
                setExpenses(Object.values(expenseState));
                setMyDone(true);
            }
        }, 20);
    },[paymentState]);


    return (
        <>
            {!myDone ? <p>not loaded or maybe u dont have any payments</p> : 
                <div className='out-div-payments'>
                    <ul>
                        {myPayments.map((payment) => {
                            <li className='mypayment-li'>{``}</li>
                        })} 
                    </ul>
                </div>
            }
        </>
    )
}


export default RecentActivityPage