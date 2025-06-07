import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="w-full bg-white/70 backdrop-blur shadow sticky top-0 z-10">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="text-xl md:text-2xl font-extrabold text-emerald-700">
          🍽️ Calorie Estimator
        </Link>
        <div className="space-x-6 text-gray-700 font-medium">
          <Link to="/" className="hover:text-emerald-600">Home</Link>
          <Link to="/analyze" className="hover:text-emerald-600">Analyze</Link>
        </div>
      </div>
    </nav>
  );
} 