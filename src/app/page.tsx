"use client";

import { useAuthContext } from "../context/AuthContext";
import Spinner from "../components/reusables/spinner";

export default function Home() {
  const { loading } = useAuthContext();

  if (loading) {
    return <Spinner />;
  }

  return <div></div>;
}
