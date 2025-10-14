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
import { loginState, emailState } from "./atom/atom"
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function App() {
  const [logged, setLogged] = useRecoilState(loginState);
  const [email, setEmail] = useRecoilState(emailState);

  const { data, isLoading, isError} = useQuery({
    queryKey: ["getEmail"],
    queryFn: async () => {
      const res = await axios.get(BACKEND_URL+"verify/"+localStorage.getItem("token"))  
      if (res.data) {
        setEmail(res.data)
        setLogged(true)
      } else {
        setEmail("")
        setLogged(false)
      }
      return res.data
    }
  })

  return (
    <Router>
      <div className="App flex flex-col gap-5">
        <Toaster 
        position="bottom-right"
        reverseOrder={false} />
        <Navbar />
        {isLoading &&  
          <div className="w-full flex items-center justify-center">
            <span className="loading loading-bars loading-sm"></span>
          </div>
        }
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
