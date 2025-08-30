// src/utils/apiFetch.js

export default async function apiFetch(path, options = {}) {
  const url = path; // ✅ Use the full path as-is

  try {
    const res = await fetch(url, {
      ...options,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
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
      } catch (e) {
        // Ignore
      }
      throw new Error(message);
    }

    return await res.json();
  } catch (err) {
    console.error("apiFetch error:", err);
    throw err;
  }
}