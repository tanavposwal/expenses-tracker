import { useState } from "react";
import toast from "react-hot-toast";
const BACKEND_URL = "https://expense-tracker-api-ju1w.onrender.com/";

export default function AddRecord({ reload }) {
  const [transData, setTransData] = useState({
    amount: 0,
    type: "",
    brief: "",
  });

  const [isExpense, setExpense] = useState(false);

  const handleToggle = () => {
    setExpense(!isExpense);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (isExpense) {
      setTransData({ ...transData, [name]: value, type: "expense" });
    } else {
      setTransData({ ...transData, [name]: value, type: "income" });
    }
  };

  const getToken = () => {
    const cookieName = "token";
    const cookieValue = document.cookie
      .split(";")
      .map((cookie) => cookie.trim())
      .find((cookie) => cookie.startsWith(`${cookieName}=`))
      ?.split("=")[1];
    return cookieValue;
  };

  const handleSubmit = async () => {
    if (transData.brief != "" || transData.amount != "") {
      try {
        const response = await fetch(BACKEND_URL+"user/entry", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: getToken(),
          },
          body: JSON.stringify(transData),
        });

        let data = await response.json();
        toast.success(data.message);
        setTransData({
          amount: "",
          type: "",
          brief: "",
        });
      } catch (error) {
        console.error("Error submitting form:", error);
      }

      reload();
    } else {
      toast.error("No entry made");
    }
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="card flex  card-bordered p-5"
    >
      <div className="flex w-full">
        <label className="flex-1 md:pr-6 sm:pr-3 pr-2 form-control">
          <div className="label">
            {isExpense ? (
              <span className="label-text">Expense</span>
            ) : (
              <span className="label-text">Income</span>
            )}
          </div>
          <input
            type="text"
            name="brief"
            autoComplete="off"
            value={transData.brief}
            onChange={handleChange}
            className="input input-accent input-sm input-bordered w-full"
          />
          <div className="label"></div>
        </label>

        <label className="form-control">
          <div className="label">
            <span className="label-text">Amount...</span>
          </div>
          <input
            type="number"
            name="amount"
            autoComplete="off"
            value={transData.amount}
            onChange={handleChange}
            className="input input-accent input-sm input-bordered w-full"
          />
          <div className="label"></div>
        </label>
      </div>

      <div className="flex items-center w-full">
        <div className="flex-1 items-center justify-center">
          <input
            type="checkbox"
            className="toggle toggle-accent"
            checked={isExpense}
            onChange={handleToggle}
          />
        </div>

        <button
          onClick={handleSubmit}
          className="btn btn-outline btn-primary btn-sm"
        >
          add
        </button>
      </div>
    </form>
  );
}
