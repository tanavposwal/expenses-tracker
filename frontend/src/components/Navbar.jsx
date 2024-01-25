import { Link } from "react-router-dom";

export default function Home({ logged }) {
  return (
    <div className="navbar fixed top-0 z-[999] bg-base-100 shadow-lg">
      <div className="flex-1 sm:pl-6 pl-2">
        <Link to="/" className="btn btn-ghost text-xl text-white">
          Expense-tracker
        </Link>
      </div>
      <div className="flex-none">
        {logged ? (
          <div className="flex gap-1 items-center justify-center sm:mr-6 mr-2">
          <Link to="/logout" className="btn btn-ghost ml-2">Logout</Link>
          </div>
        ) : (
          <div className="sm:mr-6 mr-2">
            <Link to="/login"  className="btn btn-ghost mr-4">Login</Link>
            <Link to="/signup"  className="btn btn-ghost">Signup</Link>
          </div>
        )}
      </div>
    </div>
  );
}
