"use client";

import Spinner from "@/src/components/reusables/spinner";
import {
  DeleteAccount,
  getLocations,
  getUser,
  UpdateUser,
} from "@/src/config/functions";
import { useQuery } from "@tanstack/react-query";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import {
  AlertDialogHeader,
  AlertDialogFooter,
} from "@/src/components/ui/alert-dialog";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@radix-ui/react-alert-dialog";

export default function UserSettings() {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["locations"],
    queryFn: getLocations,
  });

  const {
    isLoading: isUserLoading,
    isError: isUserError,
    data: userData,
  } = useQuery({
    queryKey: ["userData"],
    queryFn: getUser,
  });

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    area: "",
    street: "",
  });

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    phone: "",
    area: "",
    street: "",
  });

  const router = useRouter();

  useEffect(() => {
    if (userData) {
      setFormData({
        username: userData.user_metadata["username"] || "",
        email: userData.email || "",
        phone: userData.user_metadata["phone"] || "",
        area: userData.user_metadata["area"] || "",
        street: userData.user_metadata["street"] || "",
      });
    }
  }, [userData]);

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePhone = (phone: string) => /^\d{10}$/.test(phone);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
    };
    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error);
    if (!hasErrors) {
      setLoading(true);
      try {
        await UpdateUser(
          formData.username,
          formData.email,
          formData.area,
          formData.street,
          formData.phone
        );
        toast.success("Details Updated Successfully");
      } catch (error) {
        toast.error("An Error Occurred: Please Try Again");
      }
      router.replace("/myShop");
      setLoading(false);
    }
  };

  const deleteAccount = async () => {
    try {
      setLoading(true);
      await DeleteAccount();
      toast.success("Account Deleted Successfully");
    } catch (error) {
      toast.error("An Error Occurred: Please Try Again");
    }
    router.replace("/");
    setLoading(false);
  };

  if (isLoading || loading || isUserLoading) {
    return <Spinner />;
  }

  if (isError || isUserError) {
    return <div>An Error Occurred Please Try Again</div>;
  }

  const selectedArea = data?.find((area) => area.area === formData.area);

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold text-purple-600 mb-6 text-center">
        Settings
      </h2>
      <form onSubmit={handleSubmit} className="w-[300px] md:w-[500px] mb-3">
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
            className="w-full px-3 py-2 border-b-2 border-purple-500 focus:outline-none focus:border-purple-700"
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
            className="w-full px-3 py-2 border-b-2 border-purple-500 focus:outline-none focus:border-purple-700"
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
            className="w-full px-3 py-2 border-b-2 border-purple-500 focus:outline-none focus:border-purple-700"
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
            className="w-full px-3 py-2 border-b-2 border-purple-500 focus:outline-none focus:border-purple-700"
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
              className="w-full px-3 py-2 border-b-2 border-purple-500 focus:outline-none focus:border-purple-700"
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
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition duration-200"
        >
          Update
        </button>
      </form>
      {/* <button
          type="submit"
          onClick={() => {
            deleteAccount();
          }}
          className="w-[300px] md:w-[500px] bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition duration-200"
        >
          Delete Account
        </button> */}

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button className="w-[300px] md:w-[500px] bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition duration-200">
            Delete Account
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                deleteAccount();
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
