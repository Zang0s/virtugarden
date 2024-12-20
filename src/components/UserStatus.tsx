"use client";

import { useSession } from "next-auth/react";

export default function UserStatus() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Ładowanie...</p>;
  }

  if (session) {
    return <p>Witaj, {session.user?.email}!</p>;
  }

  return <p>Nie jesteś zalogowany.</p>;
}
