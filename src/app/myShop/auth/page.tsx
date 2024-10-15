"use client";

import Login from "@/src/components/reusables/login";
import SignUp from "@/src/components/reusables/signUp";
import Lottie from "lottie-react";
import { useState } from "react";
import loginLottie from "../../../../public/login.json";
import { BluetoothConnectedIcon } from "lucide-react";

export default function AuthPage() {
  const [login, setLogin] = useState(true);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-5 py-10">
      <div className=" max-w-4xl w-full md:grid md:grid-cols-2 md:gap-8 mb-2">
        <div
          className={`${
            !login ? "hidden md:flex" : "flex"
          }  justify-center mb-2 md:mb-0 `}
        >
          <Lottie
            animationData={loginLottie}
            loop={true}
            className="w-full max-w-md"
          />
        </div>

        <div className="flex flex-col justify-center">
          <div className="w-full ">{login ? <Login /> : <SignUp />}</div>
          <div className="flex gap-x-3 justify-start py-3">
            <div className="font-[400]">
              {login ? "Not registered? " : "Have an account? "}
            </div>
            <button
              onClick={() => setLogin(!login)}
              className="text-purple-600 font-[500]"
            >
              {login ? " Sign Up" : " Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
