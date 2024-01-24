import { useEffect, useState } from "react";
import Record from "./Record";
import AddRecord from "./AddRecord";

export default function Home() {

  const [transaction, setTransaction] = useState([]);

  const getTransac = async () => {
    try {
      const response = await fetch("http://localhost:3000/user/entry", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: getToken(),
        },
      });

      let data = await response.json();

      setTransaction(data.transaction);
    } catch (error) {
      console.error("Error submitting form:", error);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/user/entry", {
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

    getTransac();
  };

  useEffect(() => {
    getTransac();
  }, []);

  return (
    <div>
      <div className="w-screen px-10 flex flex-col gap-3 mb-5">
        <AddRecord reload={getTransac} /> 
        <div className="card card-bordered p-3">
        {transaction ? [...transaction].reverse().map((trans, id) => (
          <Record key={id} token={getToken} data={trans} id={transaction.length - id - 1} reload={getTransac} />
        )) : "loading..."}
        </div>
      </div>
    </div>
  );
}
