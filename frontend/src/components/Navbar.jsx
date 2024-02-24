import { Link } from "react-router-dom";
import { loginState, emailState } from "../atom/atom";
import { useRecoilState } from "recoil";

export default function Home() {
  const [logged, setLogged] = useRecoilState(loginState)
  const [email, setEmail] = useRecoilState(emailState);

  return (
    <div className="navbar fixed top-0 z-[999] bg-base-100 shadow-lg">
      <div className="flex-1 sm:pl-6 pl-2">
        <Link to="/" className="btn btn-ghost text-xl">
          <img className="h-8" src="../../../public/spending.png" />
          Expense Tracker
        </Link>
      </div>
      <div className="flex-none">
        {logged ? (
          <div className="flex gap-1 items-center justify-center sm:mr-6 mr-2">
          <p>email: { email.email }</p>
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
