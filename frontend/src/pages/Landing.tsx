// src/pages/Landing.tsx
import Navbar from "../components/Navbar";
import Container from "../components/Container";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="bg-white min-h-screen">

      <Navbar />

      <Container>
        <div className="flex flex-col items-center text-center py-16 sm:py-20">

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold max-w-2xl leading-tight">
            Simplifying Construction with Trusted Professionals
          </h1>

          <p className="mt-4 text-gray-600 max-w-xl text-sm sm:text-base">
            Works Mentor connects you with verified experts and helps you
            manage construction projects with clarity and confidence.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">

            <Link
              to="/register"
              className="bg-black text-white px-6 py-3 rounded-lg text-sm sm:text-base"
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="border px-6 py-3 rounded-lg text-sm sm:text-base"
            >
              Login
            </Link>

          </div>

        </div>
      </Container>

    </div>
  );
};

export default Landing;