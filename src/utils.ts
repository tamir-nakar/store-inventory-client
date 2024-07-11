import type { Method } from "./models/models";

export async function makeApiCall(path: string, method: Method = "GET", body?: any) {
    const api = "http://127.0.0.1:4000";
    const headers = {
      "Content-Type": "application/json",
    };

    const options = {
      method,
      headers: method === "GET" ? {} : headers,
      body: body ? JSON.stringify(body) : undefined,
    };
    const response = await fetch(`${api}/${path}`, options);
    if (!response.ok) {
      return null;
    } else {
      return response.json();
    }
  }