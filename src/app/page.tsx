"use client";

import { useAuthContext } from "../context/AuthContext";
import Spinner from "../components/reusables/spinner";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { loading } = useAuthContext();
  const router = useRouter();

  if (loading) {
    return <Spinner />;
  }

  useEffect(() => {
    router.replace("/myShop");
  }, []);

  return <div></div>;
}
