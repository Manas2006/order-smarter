import { Link } from "react-router-dom";
import LandingHero from "../components/LandingHero";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] text-center">
      <LandingHero />
      <Link
        to="/analyze"
        className="mt-8 bg-gradient-to-r from-emerald-500 to-green-600 text-white px-8 py-4 rounded-2xl text-lg md:text-xl font-semibold shadow-lg hover:opacity-90 transition"
      >
        Get Started
      </Link>
    </div>
  );
} 