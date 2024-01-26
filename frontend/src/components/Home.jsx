import { useEffect, useState } from "react";
import Record from "./Record";
import AddRecord from "./AddRecord";
const BACKEND_URL = "https://expense-tracker-api-ju1w.onrender.com/";

export default function Home() {
  const [transaction, setTransaction] = useState([]);

  const [loading, setLoading] = useState(false);

  const getTransac = async () => {
    setLoading(true);

    fetch(BACKEND_URL + "user/entry", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: getToken(),
      }
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setTransaction(data.transaction);
      })
      .catch((error) => {
        setLoading(false)
        console.error("Error submitting form:", error);
      });

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

  useEffect(() => {
    getTransac();
  }, []);

  return (
    <div>
      <div className="w-screen md:px-10 sm:px-6 px-3 flex flex-col gap-3 mb-5">
        <AddRecord reload={getTransac} />
        <div className="card card-bordered p-3">
          {loading ? (
            <div className="w-full flex items-center justify-center">
            <span class="loading loading-bars loading-sm"></span>
            </div>
          ) : transaction.length != 0 ? (
            [...transaction]
              .reverse()
              .map((trans, id) => (
                <Record
                  key={id}
                  token={getToken}
                  data={trans}
                  id={transaction.length - id - 1}
                  reload={getTransac}
                />
              ))
          ) : (
            <div className="flex w-full items-center justify-center">
              <div className="text-2xl mt-6 border-b-8 pb-3 border-gray-600 font-black">
                Add a transaction
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
