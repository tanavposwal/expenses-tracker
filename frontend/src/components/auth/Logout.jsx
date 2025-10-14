import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loginState, emailState } from "../../store/atoms.js";
import { storage } from "../../utils/helpers.js";

export default function Logout() {
  const navigate = useNavigate();
  const [logged, setLogged] = useRecoilState(loginState);
  const [email, setEmail] = useRecoilState(emailState);

  useEffect(() => {
    // Clear authentication data
    storage.remove("token");
    setLogged(false);
    setEmail("");
    
    // Navigate to home page
    navigate("/");
  }, [navigate, setLogged, setEmail]);

  return (
    <div className="w-screen h-64 flex items-center justify-center">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  );
}
