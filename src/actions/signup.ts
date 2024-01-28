"use server";

import { env } from "@/config/environment";
import { cookies } from "next/headers";

export async function signup(username: string, password: string) {
  const returnPayload = {
    ok: false,
    msg: ""
  };
  try {
    const results = await fetch(`${env.BACKEND_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });
    if (!results.ok) {
      throw { reason: `${results.status.toString()} - ${results.statusText}` };
    }

    const { userId, accessToken } = await results.json();

    // In a real env - encrypt this
    const cookieVal = JSON.stringify({ userId, accessToken });
    cookies().set("session", cookieVal, { maxAge: 60 * 15 });
    returnPayload.ok = true;
  } catch (err: { reason: string } | any) {
    returnPayload.msg = err?.reason ?? "Registration failed";
  }
  return returnPayload;
}
