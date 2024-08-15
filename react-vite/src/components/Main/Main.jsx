// import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Main.css";
import LoginFormPage from "../LoginFormPage";
// import Sidebar from "../Sidebar/Sidebar";

function Main() {
  const user = useSelector((state) => state.session.user);
  if (!user?.id) return <LoginFormPage />;

  return (
    <div className="w-full h-full flex flex-col items-center">
      <p className="font-bold text-2xl p-5">Welcome to ShareSage!</p>
      <p className="m-4 bg-sky-600 text-white p-3 rounded-lg">
        Begin managing your expenses easily with family and friends. Go out and
        have fun without worrying about &quot;who owes who&quot;!
      </p>
      <div className="w-full">
        <p className="w-full ml-0 block px-5 px-0 pl-3 font-bold m-3">
          Created by
        </p>
        <div className="flex flex-row items-center justify-around w-full gap-3">
          <div className="bg-gray-100 w-fit p-3 rounded-lg">
            <div className="border-2 border-blue-500 rounded-full overflow-hidden w-[80px]">
              <img src="https://avatars.githubusercontent.com/u/150185287?v=4" />
            </div>
            <p className="text-sm">
              Riley
              <br /> Bona
            </p>
          </div>
          <div className="bg-gray-100 w-fit p-3 rounded-lg">
            <div className="border-2 border-blue-500 rounded-full overflow-hidden w-[80px]">
              <img src="https://avatars.githubusercontent.com/u/96795641?v=4" />
            </div>
            <p className="text-sm">
              David
              <br />
              Liu
            </p>
          </div>

          <div className="bg-gray-100 w-fit p-3 rounded-lg flex flex-col items-center">
            <div className="border-2 border-blue-500 rounded-full overflow-hidden w-[80px]">
              <img src="https://avatars.githubusercontent.com/u/151580529?v=4" />
            </div>
            <p className="text-sm">
              Philip
              <br />
              Nguyen
            </p>
          </div>

          <div className="bg-gray-100 w-fit p-3 rounded-lg">
            <div className="border-2 border-blue-500 rounded-full overflow-hidden w-[80px]">
              <img src="https://avatars.githubusercontent.com/u/93614894?v=4" />
            </div>
            <p className="text-sm">
              Tim
              <br /> Macfarlane
            </p>
          </div>
        </div>
        <p className="font-bold my-7">
          Don&apos;t forget to checkout our{" "}
          <a
            className="underline"
            href="https://github.com/rileybona/sharesage"
          >
            Github Repo
          </a>
        </p>
        <p className="font-bold text-right">From the ShareSage team</p>
      </div>
    </div>
  );
}

export default Main;
