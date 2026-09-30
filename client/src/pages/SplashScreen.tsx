// src/pages/SplashScreen.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate("/login"), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-black text-white">
      <h1
        className="glitch-text text-6xl"
        data-text="NOWHERE ELSE"
      >
        DREAMS of NOWHERE ELSE and BEYOND
      </h1>
    </div>
  );
}
