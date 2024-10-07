import { LoginUser } from "@/src/config/functions";
import { useState } from "react";
import { FormEvent } from "react";
import VerifyOtpComponent from "./verifyOtp";
import { toast } from "react-toastify";
import Spinner from "./spinner";

export default function Login() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateEmail(email)) {
      setError("");
      setLoading(true);

      try {
        await LoginUser(email);
        toast.success("Please Check Your Mail for the OTP");
        setIsOtpSent(true);
      } catch (error) {
        toast.error("An Error Occurred: Please Try Again");
      }

      setLoading(false);
    } else {
      setError("Please enter a valid email address.");
    }
  };

  if (isOtpSent) {
    return <VerifyOtpComponent email={email} />;
  }

  if (loading) {
    return <Spinner height={true} />;
  }

  return (
    <section className="flex w-full md:items-center md:justify-center ">
      <form onSubmit={handleSubmit} className="w-full">
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-purple-700 mb-1 font-bold"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            autoFocus={true}
            className="bg-inherit w-full  py-1 border-b  border-purple-500 focus:outline-none focus:border-purple-700 focus:border-b-2"
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
        <button
          type="submit"
          className="w-[100px] bg-purple-600 text-white font-[500]  py-2  hover:bg-purple-700 transition duration-200 rounded-2xl"
        >
          Continue
        </button>
      </form>
    </section>
  );
}
