import { useRecoilState } from "recoil";
import { loginState, emailState } from "../store/atoms.js";
import { storage } from "../utils/helpers.js";

export default function Navbar() {
  const [logged, setLogged] = useRecoilState(loginState);
  const [email, setEmail] = useRecoilState(emailState);

  const handleLogout = () => {
    storage.remove("token");
    setLogged(false);
    setEmail("");
  };

  return (
    <div className="navbar bg-base-100 shadow-lg">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl font-bold text-primary">
          💰 Expense Tracker
        </a>
      </div>
      
      <div className="flex-none">
        {logged ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full bg-primary text-primary-content flex items-center justify-center">
                <span className="text-sm font-bold">
                  {email ? email.charAt(0).toUpperCase() : 'U'}
                </span>
              </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <div className="text-sm text-gray-600 px-4 py-2">
                  {email}
                </div>
              </li>
              <li>
                <a href="/logout" className="text-red-600 hover:bg-red-50">
                  Logout
                </a>
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex gap-2">
            <a href="/login" className="btn btn-primary btn-sm">
              Login
            </a>
            <a href="/signup" className="btn btn-outline btn-sm">
              Sign Up
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
