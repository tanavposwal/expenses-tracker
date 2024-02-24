import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { Toaster } from 'react-hot-toast';
import {API as BACKEND_URL} from "./components/API"
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import Guest from "./components/Guest";
import Logout from "./components/Logout";
import { useRecoilState } from 'recoil';
import { loginState } from "./atom/atom"

function App() {
  const [logged, setLogged] = useRecoilState(loginState);

  useEffect(()=>{
    fetch(BACKEND_URL+"verify/"+localStorage.getItem("token"), {
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
        <Navbar />
        <br />
        <br />
        <br />
        <Routes>
          <Route exact path="/" element={logged ? <Home /> : <Guest />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/signup" element={<Signup/>}></Route>
          <Route exact path="/logout" element={<Logout />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
