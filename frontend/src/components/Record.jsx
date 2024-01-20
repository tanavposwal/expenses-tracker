export default function Record(props) {
  return (
    <div className="px-4 flex gap-3 justify-center items-center select-none">
      <div className="flex flex-1 flex-col">
        <span className="items-center py-0 text-gray-500 text-xs">{props.data.date}</span>
        <span className="text-lg py-0">{props.data.brief}</span>
      </div>
      <span className="py-1">₹</span>
      
      {props.data.type != "expense" ? (
        <div className="flex gap-2">
          <span className="flex justify-center font-black text-black items-center w-20 bg-red-600">0</span>
          <span className="flex justify-center font-black text-black items-center w-20  bg-green-600">{props.data.amount}</span>
        </div>
        ) : (
        <div className="flex gap-2">
          <span className="flex justify-center font-black text-black items-center w-20 bg-red-600">{props.data.amount}</span>
          <span className="flex justify-center font-black text-black items-center w-20  bg-green-600">0</span>
        </div>
      ) }
      
      <div className="relative flex flex-col items-center justify-center">
      
      <div className="dropdown dropdown-bottom dropdown-end">
  <div tabIndex={0} role="button" className="btn btn-sm m-1"><Menu /></div>
  <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
    <li><a>Delete</a></li>
    <li><a>Edit</a></li>
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


