
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { Toaster } from 'react-hot-toast';
import {API as BACKEND_URL} from "./components/API"
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import Guest from "./components/Guest";
import Logout from "./components/Logout";

function App() {
  const [logged, setLogged] = useState(false);

  const getToken = () => {
    const cookieName = "token";
    const cookieValue = document.cookie
      .split(";")
      .map((cookie) => cookie.trim())
      .find((cookie) => cookie.startsWith(`${cookieName}=`))
      ?.split("=")[1];
    return cookieValue;
  };

  useEffect(()=>{
    fetch(BACKEND_URL+"verify/"+getToken(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setLogged(true)
        } else {
          setLogged(false)
        }       
      })
      .catch((error) => {
        console.error(error);
      });
  })

  return (

    <Router>
      <div className="App flex flex-col gap-5">
        <Toaster 
        position="bottom-right"
        reverseOrder={false} />
        <Navbar logged={logged} />
        <br />
        <br />
        <br />
        <Routes>
          <Route exact path="/" element={logged ? <Home /> : <Guest />}></Route>
          <Route exact path="/login" element={<Login setLogged={setLogged} />}></Route>
          <Route exact path="/signup" element={<Signup/>}></Route>
          <Route exact path="/logout" element={<Logout logged={logged} setLogged={setLogged} />}></Route>
        </Routes>
      </div>
    </Router>

  );
}

export default App;
