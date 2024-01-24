import { useEffect } from "react"
import { useNavigate } from "react-router-dom";

export default function Logout({ logged, setLogged }) {
    const navigate = useNavigate();

    useEffect(() => {
        document.cookie = `token=; max-age=900000; path=/;`;
        setLogged(!logged)
        navigate("/")
    })

    return (
        <div className="w-screen h-64 flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
        </div>
    )
}