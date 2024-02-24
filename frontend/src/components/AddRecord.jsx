import { useState } from "react";
import toast from "react-hot-toast";
import {API as BACKEND_URL} from "./API"

export default function AddRecord({ reload }) {
  const [transData, setTransData] = useState({
    amount: "",
    type: "",
    brief: "",
  });

  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (transData.brief != "" || transData.amount != "") {
      setLoading(!loading);
      fetch(BACKEND_URL + "user/entry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin': '*',
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify(transData),
      })
        .then((response) => response.json())
        .then((data) => {
          toast.success(data.message);
          setTransData({
            amount: "",
            type: "",
            brief: "",
          });
          reload();
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error submitting form:", error);
        });
        
    } else {
      toast.error("No entry made");
    }
  };

  return (
    <form className="card border-gray-400 flex card-bordered sm:p-5 p-2" onSubmit={handleSubmit}>
      <div className="flex w-full">
        <label className="flex-1 md:pr-6 sm:pr-3 pr-1 form-control">
          <div className="label py-0">
            <span className="label-text">Detail...</span>
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
          <div className="label py-0">
            <span className="label-text">Amount...</span>
          </div>
          <input
            type="number"
            name="amount"
            autoComplete="off"
            value={transData.amount}
            onChange={handleChange}
            className="input input-accent input-sm input-bordered sm:w-full w-24"
          />
          <div className="label"></div>
        </label>
      </div>

      <div className="flex  items-center justify-center w-full">
        <div className="flex-1">
          <div className="flex h-fit">
            <input
              type="checkbox"
              className="toggle toggle-primary"
              checked={isExpense}
              onChange={handleToggle}
            />
            <div className="ml-3 p-0 ">
              {isExpense ? <span>Expense</span> : <span>Income</span>}
            </div>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className={
            loading
              ? "btn btn-outline btn-primary btn-sm btn-disabled"
              : "btn btn-outline btn-primary btn-sm"
          }
        >
          add
          {loading && (
            <span className="loading loading-xs loading-spinner text-error"></span>
          )}
        </button>
      </div>
    </form>
  );
}
