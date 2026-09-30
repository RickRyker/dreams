import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-96 space-y-4 text-center">
        <h2 className="text-2xl font-bold">Page Not Found</h2>
        <p className="text-sm text-gray-400">
          The route you entered does not exist.
        </p>
        <div className="flex justify-center gap-4 text-xs">
          <Link to="/login" className="hover:text-cyan-400">
            Login
          </Link>
          <Link to="/" className="hover:text-cyan-400">
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
