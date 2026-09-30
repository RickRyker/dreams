import { Link } from "react-router-dom";

export default function ServerUnavailable() {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-[520px] space-y-4">
        <h2 className="text-2xl font-bold text-center">Server Unavailable</h2>
        <p className="text-sm text-gray-300 text-center">
          We could not reach the server. Please try again in a moment.
        </p>
        <div className="flex justify-center gap-4 text-xs">
          <button
            onClick={() => window.location.reload()}
            className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-2 px-4 rounded"
          >
            Retry
          </button>
          <Link to="/login" className="hover:text-cyan-400 self-center">
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}
