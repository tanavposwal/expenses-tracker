import { useEffect } from "react"

export default function Logout() {

    useEffect(() => {
        document.cookie = `token=; max-age=900000; path=/;`;
    })

    return (
        <div className="w-screen h-64 flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
        </div>
    )
}