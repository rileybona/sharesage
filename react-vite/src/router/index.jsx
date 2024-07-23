import { createBrowserRouter } from "react-router-dom";
import LoginFormPage from "../components/LoginFormPage";
import SignupFormPage from "../components/SignupFormPage";
import Layout from "./Layout";
import Main from "../components/Main/Main";
import AllExpensePage from "../components/AllExpensePage/AllExpensePage";
import ExpenseDetail from "../components/ExpenseDetail";
import RecentActivityPage from "../components/RecentActivityPage/RecentActivityPage.jsx";
import Test from "../components/Main/Test";
// import Comments from "../components/Comments/Comments";
import UserAccountPage from "../components/UserAccountPage";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Main />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "expenses",
        element: <AllExpensePage />,
      },
      {
        path: "expenses/:expenseId",
        element: <ExpenseDetail />,
      },
      {
        path: "recentActivity",
        element: <RecentActivityPage />,
      },
      {
        path: "test",
        element: <Test />,
      },
      {
        path: "account/settings",
        element: <UserAccountPage />,
      },
    ],
  },
]);
