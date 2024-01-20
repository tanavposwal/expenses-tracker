import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DP from "./DP";

export default function Home({ logged }) {
  return (
    <div className="navbar bg-base-100 shadow-lg">
      <div className="flex-1 pl-6">
        <Link to="/" className="btn btn-ghost text-xl text-white">
          Expense-tracker
        </Link>
      </div>
      <div className="flex-none">
        {logged ? (
          <div className="flex gap-1 items-center justify-center">
          <DP name="tanav poswal" />
          <Link to="/logout" className="btn btn-ghost mr-4">Logout</Link>
          </div>
        ) : (
          <div className="mr-6">
            <Link to="/login"  className="btn btn-ghost mr-4">Login</Link>
            <Link to="/signup"  className="btn btn-ghost">Signup</Link>
          </div>
        )}
      </div>
    </div>
  );
}
