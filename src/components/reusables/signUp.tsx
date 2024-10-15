import { getLocations, SignUpUser } from "@/src/config/functions";
import { useState, FormEvent, ChangeEvent } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Spinner from "./spinner";

export default function SignUp() {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["locations"],
    queryFn: getLocations,
  });

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    area: "",
    street: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    phone: "",
    area: "",
    street: "",
    password: "",
  });

  const router = useRouter();

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone: string) => /^\d{10}$/.test(phone);
  const validatePassword = (password: string) => password.length > 6;

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "area") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
        street: "",
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }

    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = {
      username: formData.username ? "" : "Username is required.",
      email: validateEmail(formData.email)
        ? ""
        : "Please enter a valid email address.",
      phone: validatePhone(formData.phone)
        ? ""
        : "Phone number must be 10 digits.",
      area: formData.area ? "" : "Area is required.",
      street: formData.street ? "" : "Street is required.",
      password: validatePassword(formData.password)
        ? ""
        : "Password must be longer than 6 characters.",
    };
    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error);
    if (!hasErrors) {
      setLoading(true);

      try {
        const { data, error } = await SignUpUser(
          formData.username,
          formData.email,
          formData.password,
          formData.area,
          formData.street,
          formData.phone
        );
        if (data.user === null) {
          toast.error(`${error?.message}`);
        } else {
          toast.success("Account created successfully");
          router.replace("/myShop");
        }
      } catch (error) {
        toast.error("An Error Occurred: Please Try Again");
      }
    }
  };

  if (isLoading || loading) {
    return <Spinner height={true} />;
  }

  if (isError) {
    return <div>An Error Occurred Please Try Again</div>;
  }

  const selectedArea = data?.find((area) => area.area === formData.area);

  return (
    <section className="flex flex-col w-full">
      <h2 className="text-2xl font-bold text-purple-600 mb-6 text-center">
        Sign Up
      </h2>
      <form onSubmit={handleSubmit} className="w-full mb-5">
        <div className="mb-4">
          <label htmlFor="username" className="block text-purple-700 mb-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-3 py-2 border-b focus:border-b-2  border-purple-500 focus:outline-none focus:border-purple-700"
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-2">{errors.username}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-purple-700 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border-b focus:border-b-2  border-purple-500 focus:outline-none focus:border-purple-700"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-2">{errors.email}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block text-purple-700 mb-2">
            Phone
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border-b focus:border-b-2  border-purple-500 focus:outline-none focus:border-purple-700"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-2">{errors.phone}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="area" className="block text-purple-700 mb-2">
            Area
          </label>
          <select
            id="area"
            name="area"
            value={formData.area}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-transparent border-b focus:border-b-2  border-purple-500 focus:outline-none focus:border-purple-700"
          >
            <option value="">Select an area</option>
            {data?.map((area) => (
              <option key={area.id} value={area.area}>
                {area.area}
              </option>
            ))}
          </select>
          {errors.area && (
            <p className="text-red-500 text-sm mt-2">{errors.area}</p>
          )}
        </div>
        {selectedArea && (
          <div className="mb-4">
            <label htmlFor="street" className="block text-purple-700 mb-2">
              Street
            </label>
            <select
              id="street"
              name="street"
              value={formData.street}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-transparent border-b focus:border-b-2  border-purple-500 focus:outline-none focus:border-purple-700"
            >
              <option value="">Select a street</option>
              {selectedArea.streets.map((street) => (
                <option key={street} value={street}>
                  {street}
                </option>
              ))}
            </select>
            {errors.street && (
              <p className="text-red-500 text-sm mt-2">{errors.street}</p>
            )}
          </div>
        )}
        <div className="mb-4">
          <label htmlFor="password" className="block text-purple-700 mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border-b focus:border-b-2  border-purple-500 focus:outline-none focus:border-purple-700"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-2">{errors.password}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition duration-200"
        >
          Register
        </button>
      </form>
    </section>
  );
}
