import toast from 'react-hot-toast';
const BACKEND_URL = "https://expense-tracker-api-ju1w.onrender.com/";

export default function Record(props) {
  const handleDelete = async () => {
    try {
      const response = await fetch(BACKEND_URL+"user/entry/"+props.id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "token": props.token()
        },
      });

      if (response.ok) {
        toast.success(response.json().message)
        props.reload()
      } else {
        console.log(response)
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="sm:px-4 md:px-4 lg:px-4 px-2 py-2 flex gap-3 justify-center items-center select-none">
      <div className="flex flex-1 flex-col">
        <span className="items-center py-0 text-gray-500 text-xs">{props.data.date}</span>
        <span className="text-lg py-0">{props.data.brief}</span>
      </div>
      <span className="py-1">₹</span>
      
      {props.data.type != "expense" ? (
        <div className="flex gap-2">
          <span className="flex justify-center font-black text-black items-center md:w-20 sm:w-10 w-10 bg-red-600">0</span>
          <span className="flex justify-center font-black text-black items-center md:w-20 sm:w-10 w-10 bg-green-600">{props.data.amount}</span>
        </div>
        ) : (
        <div className="flex gap-2">
          <span className="flex justify-center font-black text-black items-center md:w-20 sm:w-10 w-10 bg-red-600">{props.data.amount}</span>
          <span className="flex justify-center font-black text-black items-center md:w-20 sm:w-10 w-10 bg-green-600">0</span>
        </div>
      ) }
      
      <div className="relative flex flex-col items-center justify-center">
      
      <div className="dropdown dropdown-bottom dropdown-end">
  <div tabIndex={0} role="button" className="btn btn-sm m-1 p-1"><Menu /></div>
  <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
    <li><button onClick={handleDelete}>Delete</button></li>
  </ul>
</div>
  </div>
      </div>
  );
}

function Menu() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
  )
}


