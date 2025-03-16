import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
export const AuthPage = ({ setIsAuthenticated }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const toggleAuthMode = () => {
    setIsSignUp((prev) => !prev);
  };

  const handleAuth = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const username = formData.get("email");
    const password = formData.get("password");
    try {
      const endpoint = isSignUp
        ? `${BACKEND_URL}/api/v1/signup `
        : `${BACKEND_URL}/api/v1/signin`;
      const response = await axios.post(
        endpoint,
        { username, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const { token } = response.data;
        console.log(token);
        localStorage.setItem("token", token);
        setIsAuthenticated(true);
        navigate("/dashboard");
        console.log("Auth success", response.data);
      } else {
        console.log("Auth failed", response.data);
      }
    } catch (error) {
      console.error(
        "Error during authentication:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">
          {isSignUp ? "Create an Account" : "Welcome Back"}
        </h2>

        <form className="space-y-4" onSubmit={handleAuth}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-purple-500"
          />

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 hover:cursor-pointer transition"
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <span
            onClick={toggleAuthMode}
            className="text-purple-600 cursor-pointer hover:underline"
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
};
