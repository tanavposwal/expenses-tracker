import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { Toaster } from 'react-hot-toast';
import { useRecoilState } from 'recoil';

// Components
import Home from "./components/pages/Home";
import Login from "./components/auth/Login";
import Navbar from "./components/layout/Navbar";
import Signup from "./components/auth/Signup";
import Guest from "./components/auth/Guest";
import Logout from "./components/auth/Logout";

// Store and Services
import { loginState, emailState } from "./store/atoms";
import { useVerifyToken } from "./hooks/useAuth.js";
import { storage } from "./utils/helpers.js";

function App() {
  const [logged, setLogged] = useRecoilState(loginState);
  const [email, setEmail] = useRecoilState(emailState);

  const token = storage.get("token");
  const { data, isLoading } = useVerifyToken(token);

  // Update auth state when verification completes
  useEffect(() => {
    if (data?.email) {
      setEmail(data.email);
      setLogged(true);
    } else if (data === null && token) {
      // Token is invalid, clear it
      storage.remove("token");
      setEmail("");
      setLogged(false);
    }
  }, [data, token, setEmail, setLogged]);

  return (
    <Router>
      <div className="App flex flex-col min-h-screen bg-gray-50">
        <Toaster
          position="bottom-right"
          reverseOrder={false}
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
          }}
        />

        <Navbar />

        <main className="flex-1">
          {isLoading && (
            <div className="w-full flex items-center justify-center py-8">
              <span className="loading loading-bars loading-lg"></span>
            </div>
          )}

          <Routes>
            <Route path="/" element={logged ? <Home /> : <Guest />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </main>

        <footer className="footer footer-center p-4 bg-base-200 text-base-content">
          <aside>
            <p>Copyright © 2024 - Expense Tracker App</p>
          </aside>
        </footer>
      </div>
    </Router>
  );
}

export default App;