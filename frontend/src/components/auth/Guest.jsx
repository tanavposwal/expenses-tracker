export default function Guest() {
  return (
    <div className="w-screen flex justify-center flex-col items-center select-none min-h-[60vh]">
      <div className="mt-16">
        <span className="loading loading-dots loading-lg"></span>
      </div>
      <div className="text-3xl mt-8 border-b-8 pb-3 border-red-600 font-black text-center">
        Please log in first
      </div>
      <div className="mt-6 text-center text-gray-600">
        <p>You need to be logged in to access your expense tracker.</p>
        <div className="mt-4 flex gap-4 justify-center">
          <a href="/login" className="btn btn-primary">
            Login
          </a>
          <a href="/signup" className="btn btn-outline">
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
}
