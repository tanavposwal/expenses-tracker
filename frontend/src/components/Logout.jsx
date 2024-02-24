import { useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { loginState } from "../atom/atom";
import { useRecoilState } from "recoil";

export default function Logout() {
    const navigate = useNavigate();
    const [logged, setLogged] = useRecoilState(loginState)

    useEffect(() => {
        localStorage.setItem("token", "")
        setLogged(!logged)
        navigate("/")
    })

    return (
        <div className="w-screen h-64 flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
        </div>
    )
}