import { useState } from "react";
import toast from 'react-hot-toast';

export default function Signup() {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmpass: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password == formData.confirmpass) {  
    fetch("http://localhost:3000/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        toast.success(data.message);
        setFormData({
          fullname: "",
          email: "",
          password: "",
          confirmpass: "",
        })
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
        // Handle errors
      });
    } else {
        alert("Password no matched")
    }
  };

  return (
    <div className="w-screen flex flex-col items-center justify-center py-5">
      <div className="text-6xl mt-6 border-b-8 pb-3 border-green-600 font-black">
        Sign up
      </div>
      <form
        onSubmit={handleSubmit}
        className="mt-16 flex flex-col border p-5 card card-bordered w-fit gap-4"
      >
        <input
          placeholder="Full name"
          type="text"
          required
          className="input input-bordered input-error min-w-[16rem]"
          name="fullname"
          value={formData.fullname}
          onChange={handleChange}
        />
        <input
          placeholder="Email"
          type="email"
          required
          className="input input-bordered input-error min-w-[16rem]"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          placeholder="Password"
          required
          type="password"
          className="input input-bordered input-error min-w-[16rem]"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <input
          placeholder="Confirm Password"
          required
          type="password"
          className="input input-bordered input-error min-w-[16rem]"
          name="confirmpass"
          value={formData.confirmpass}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="btn btn-outline btn-accent"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
