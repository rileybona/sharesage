import { NavLink } from 'react-router-dom'
import './AllExpensePage.css'

function AllExpensePage() {

    return (
        <>
         <h1>wow its all your expenses!</h1>
         <NavLink to="/expenses/1">An Expense</NavLink>
        </>
    )
}

export default AllExpensePage
