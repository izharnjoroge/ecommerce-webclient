import { LoginUser, VerifyOtp } from "@/src/config/functions";
import { useState, FormEvent, ChangeEvent } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Spinner from "./spinner";
import { useAuthContext } from "@/src/context/AuthContext";
import { Button } from "../ui/button";

interface VerifyOtpProps {
  email: string;
}

export default function VerifyOtpComponent({ email }: VerifyOtpProps) {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { checkSession } = useAuthContext();

  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d{0,6}$/.test(value)) {
      setOtp(value);
      setError("");
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (otp.length === 6) {
      setError("");
      setLoading(true);

      try {
        const { data, error } = await VerifyOtp(email, otp);

        if (data.user === null) {
          toast.error(`${error?.message}`);
        } else {
          toast.success("Welcome Back");
          checkSession();
          router.replace("/myShop");
        }
      } catch (error) {
        toast.error("An Error Occurred: Please Try Again");
      }

      setLoading(false);
    } else {
      setError("Please enter a valid 6-digit OTP.");
    }
  };

  const handleRefresh = async () => {
    setError("");
    setOtp("");
    setLoading(true);
    try {
      const { data, error } = await LoginUser(email);
      if (error !== null) {
        toast.error(`${error?.message}`);
      } else {
        toast.success("Please Check Your Mail for the OTP");
      }
    } catch (error) {
      toast.error("An Error Occurred: Please Try Again");
    }
    setLoading(false);
  };

  if (loading) {
    return <Spinner height={true} />;
  }

  return (
    <div className="flex items-center md:items-start md:justify-start justify-center">
      <div className="w-full max-w-sm">
        <h2 className="text-2xl font-bold text-purple-600 mb-6 text-center">
          Verify OTP
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="otp" className="block text-purple-700 mb-2">
              Enter OTP sent to {email}
            </label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={handleChange}
              className=" w-full px-3 py-2 border-b border-purple-500 focus:outline-none focus:border-purple-700"
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition duration-200"
          >
            Submit
          </button>
        </form>
        <div className="flex md:gap-x-3 gap-x-1 justify-start py-3">
          <div className="font-[400]">Didn´t receive an OTP?</div>
          <button
            onClick={handleRefresh}
            className="text-purple-600 font-[500]"
          >
            Click here to resend
          </button>
        </div>
      </div>
    </div>
  );
}
