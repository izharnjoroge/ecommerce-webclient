"use client";

import Lottie from "lottie-react";
import loginLottie from "../../public/login.json";
import { useState } from "react";
import Login from "../components/reusables/login";
import SignUp from "../components/reusables/signUp";
import { useAuthContext } from "../context/AuthContext";
import Spinner from "../components/reusables/spinner";

export default function Home() {
  const [login, setLogin] = useState(true);
  const { loading } = useAuthContext();

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col items-center justify-center  p-5">
      <div className="w-full max-w-4xl md:grid md:grid-cols-2 md:gap-8 h-screen mb-2">
        <div className="hidden md:flex justify-center mb-2 md:mb-0 ">
          <Lottie
            animationData={loginLottie}
            loop={true}
            className="w-full max-w-md"
          />
        </div>

        <div className="flex flex-col space-y-4  justify-center">
          <div className="w-full max-w-sm">
            {login ? <Login /> : <SignUp />}
          </div>
          <div className="flex gap-2 font-bold">
            <div>{login ? "Not registered? " : "Have an account? "}</div>
            <div onClick={() => setLogin(!login)} className="text-purple-600  ">
              {login ? " Sign Up" : " Login"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
