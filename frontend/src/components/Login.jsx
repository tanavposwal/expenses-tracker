import { useState } from "react";
import toast from 'react-hot-toast';

export default function Login({ setLogged }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:3000/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        email: formData.email,
        password: formData.password,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        toast.success(data.message)
        document.cookie = `token=${data.token}; max-age=900000; path=/;`;
        setLogged(true)
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
        // Handle errors
      });
  };

  return (
    <div className="w-screen flex flex-col items-center justify-center py-5">
      <div className="text-6xl mt-6 border-b-8 pb-3 border-green-600 font-black">
        Log in
      </div>
      <form
        className="mt-16 flex flex-col p-5 card card-bordered gap-4 w-fit"
        onSubmit={handleSubmit}
      >
        <input
          placeholder="Email"
          type="email"
          required
          name="email"
          className="input input-bordered input-error min-w-[16rem]"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          placeholder="Password"
          required
          name="password"
          type="password"
          className="input input-bordered input-error min-w-[16rem]"
          value={formData.password}
          onChange={handleChange}
        />
        <button
          className="btn btn-outline btn-accent"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
}
