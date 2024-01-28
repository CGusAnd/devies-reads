"use server";

import { env } from "@/config/environment";
import { User } from "@/models/user";
import { cookies } from "next/headers";

export async function tryGetUser() {
  const sessionCookie = cookies().get("session")?.value;
  const session = sessionCookie ? JSON.parse(sessionCookie) : null;

  if (session) {
    try {
      const res = await fetch(`${env.BACKEND_URL}/users/${session.userId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${session.accessToken}` }
      });
      if (res.ok) return res.json() as Promise<User>;
      else {
        const { status, statusText } = res;
        throw { status, statusText };
      }
    } catch (err) {
      console.log(err);
    }
  }
  return null;
}
