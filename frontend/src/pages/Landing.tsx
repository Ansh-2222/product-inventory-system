// src/pages/Landing.tsx
import Navbar from "../components/Navbar";
import Container from "../components/Container";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="bg-white min-h-screen">

      <Navbar />

      <Container>

        {/* HERO */}
        <div className="flex flex-col items-center text-center py-16 sm:py-24">

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold max-w-3xl leading-tight text-gray-900">
            Simplifying Construction with Trusted Professionals
          </h1>

          <p className="mt-6 text-gray-600 max-w-xl text-base sm:text-lg">
            Works Mentor connects you with verified experts and helps you
            manage construction projects with clarity and confidence.
          </p>

          {/* CTA */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">

            <Link
              to="/register"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg text-sm sm:text-base hover:bg-blue-700 transition shadow"
            >
              Get Started 
            </Link>

            <Link
              to="/login"
              className="border border-gray-300 px-6 py-3 rounded-lg text-sm sm:text-base hover:bg-gray-100 transition"
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