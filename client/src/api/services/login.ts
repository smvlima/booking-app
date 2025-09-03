import { API_URL } from "../const";

export async function login(email: string, password: string) {
  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(
        data.error?.formErrors?.[0] || data.error || "Login failed"
      );
    }

    return data;
  } catch (err) {
    console.error("Login error:", err);
    throw err;
  }
}
