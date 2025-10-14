import Record from "./Record";
import AddRecord from "./AddRecord";
import {API as BACKEND_URL} from "./API"
import { transactionState } from "../atom/atom";
import { useRecoilState } from "recoil"
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function Home() {
  const [transaction, setTransaction] = useRecoilState(transactionState);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["getTransac"],
    queryFn: async () => {
      const res = await axios.get(BACKEND_URL + "user/entry", {
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      })  
      setTransaction(res.data.transaction);
      return res.data.transaction;
    }
  })

  return (
    <div>
      <div className="w-screen md:px-10 sm:px-6 px-3 flex flex-col gap-3 mb-5">
        <AddRecord reload={refetch} />
        <div className="card border-gray-400 card-bordered p-3">
          {isLoading ? (
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
                  reload={refetch}
                />
              ))
          ) : (
            <div className="flex w-full items-center justify-center">
              <div className="text-2xl my-6 border-b-8 pb-3 border-gray-600 font-black">
                Add a transaction
              </div>
            </div>
          ))}

          {isError && (
            <div className="flex w-full items-center justify-center">
              <div className="text-2xl my-6 border-b-8 pb-3 border-gray-600 font-black">
                Error
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
