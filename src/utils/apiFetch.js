// src/utils/apiFetch.js

const BASE_URL = "http://localhost:8080";

export default async function apiFetch(path, options = {}) {
  try {
    const res = await fetch(BASE_URL + path, {
      ...options,
      credentials: "include", 
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });

    if (res.status === 401) {
      window.location.href = "/login";
      throw new Error("Unauthorized");
    }

    if (!res.ok) {
      let message = "API request failed";
      try {
        const data = await res.json();
        message = data.error || data.message || message;
      } catch {}
      throw new Error(message);
    }

    return res.json();
  } catch (err) {
    console.error("apiFetch error:", err);
    throw err;
  }
}
