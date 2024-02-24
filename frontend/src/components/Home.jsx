import { useEffect, useState } from "react";
import Record from "./Record";
import AddRecord from "./AddRecord";
import {API as BACKEND_URL} from "./API"
import { transactionState } from "../atom/atom";
import { useRecoilState } from "recoil"

export default function Home() {
  const [transaction, setTransaction] = useRecoilState(transactionState);
  const [loading, setLoading] = useState(false);

  const getTransac = async () => {
    setLoading(true);

    fetch(BACKEND_URL + "user/entry", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': 'https://expenses-tracker-backend-l521.onrender.com/',
        token: localStorage.getItem("token"),
      },
      mode: 'no-cors'
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

  useEffect(() => {
    getTransac();
  }, []);

  return (
    <div>
      <div className="w-screen md:px-10 sm:px-6 px-3 flex flex-col gap-3 mb-5">
        <AddRecord reload={getTransac} />
        <div className="card border-gray-400 card-bordered p-3">
          {loading ? (
            <div className="w-full flex items-center justify-center">
            <span className="loading loading-bars loading-sm"></span>
            </div>
          ) : (transaction.length != 0 ? (
            [...transaction]
              .reverse()
              .map((trans, id) => (
                <Record
                  key={id}
                  data={trans}
                  id={transaction.length - id - 1}
                  reload={getTransac}
                />
              ))
          ) : (
            <div className="flex w-full items-center justify-center">
              <div className="text-2xl my-6 border-b-8 pb-3 border-gray-600 font-black">
                Add a transaction
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
