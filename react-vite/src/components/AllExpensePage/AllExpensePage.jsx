import { useDispatch, useSelector } from 'react-redux'
import { clearComments } from "../../redux/comment";
import { NavLink } from 'react-router-dom'
import './AllExpensePage.css'
import { useEffect, useState } from 'react'
import { getAllExpenses } from '../../redux/expense'

function monthFormatHelper(dateString) {
    const date = new Date(dateString);

    // month abrvs
    const months = [
        'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
    ];

    const monthIndex = date.getMonth();

    return months[monthIndex];
}

function dayFormatHelper(dateString) {
    const date = new Date(dateString);

    let dayString = date.getDate().toString();
    if (dayString.length == 1) {
        dayString = `0${dayString}`;
    }

    return dayString;
}

function moneyFormatHelper(moneyString) {
    let moneyFloat = moneyString.toFixed(2);
    let money = `$${moneyFloat}`
    return money;
}

function AllExpensePage() {
    // define state variables & react hooks
    const dispatch = useDispatch();
    const [done, setDone] = useState(false);
    const [expenses, setExpenses] = useState([]);

    // TEMPORARY IMAGE HARDCODE ------
    // define type images - example method
    const typeImgUrls = new Map();
    typeImgUrls.set("Food", "../../public/food.png");
    typeImgUrls.set("Travel", "../../public/travel.png");
    typeImgUrls.set("Home", "../../public/home.png");
    typeImgUrls.set("Entertainment", "../../public/entertainment.png");
    typeImgUrls.set("Other", "../../public/other.png");


    // --------------------------------

    const expenseState = useSelector(state => state.expense.root_expenses);

    // useEffect on page render
    useEffect(() => {
        dispatch(clearComments());
        dispatch(getAllExpenses());
    }, [dispatch]);

    // 2nd useEffect listens to slice of state & closes circuit when populated
    useEffect(() => {
        setTimeout(() => {
            if (Object.keys(expenseState).length > 0) {
                setExpenses(Object.values(expenseState));
                setDone(true);
            }
        }, 20)
    }, [expenseState]);

    // return <h1>testing stuff sorry!</h1>

    return (
        <>
         {!(expenses.length > 0) ? <p>NOT LOADED</p> :
            <div className='out-div-all-expenses'>
                {expenses.map((expense) => (
                    <div className='expense-card' key={expense.id}>
                        <NavLink to={`/expenses/${expense.id}`} className='ecard-navLink'>
                            <div className='ecard-left'>
                                <div className='ecard-date'>
                                    <p className='mo'>{monthFormatHelper(expense.transaction_date)}</p>
                                    <p className='day'>{dayFormatHelper(expense.transaction_date)}</p>
                                </div>
                                <div className='ecard-img-container'>
                                    <img src={typeImgUrls.get(expense.expense_type)} className='ecard-img'/>
                                </div>
                                <h4 className='ecard-title'>{expense.name}</h4>
                            </div>
                            <div className='ecard-money'>
                                <p>Expense Total:</p>
                                <p>{moneyFormatHelper(expense.amount)}</p>
                            </div>
                        </NavLink>
                    </div>
                ))}
            </div>
         }
        </>
    )
}

export default AllExpensePage
