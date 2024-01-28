"use server";

import { env } from "@/config/environment";
import { cookies } from "next/headers";

export async function backendCall<T = any>(
  endpoint: string,
  method: string,
  body?: object
) {
  const userCookie = cookies().get("session")?.value;
  const user = userCookie ? JSON.parse(userCookie) : null;
  const headers: { [key: string]: string } = {};
  if (user?.accessToken)
    headers["Authorization"] = `Bearer ${user.accessToken}`;
  if (body) headers["Content-Type"] = "application/json";

  const options: { method: string; headers: any; body?: string } = {
    method,
    headers
  };
  if (body) options.body = JSON.stringify(body);

  try {
    const res = await fetch(`${env.BACKEND_URL}${endpoint}`, options);

    if (!res.ok) throw `${res.status.toString()} - ${res.statusText}`;
    return res.json() as T;
  } catch (err) {
    console.error(err);
  }
}
