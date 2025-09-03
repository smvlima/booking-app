import { API_URL } from "../const";
import { useHeaders } from "../hooks/useHeaders";

export async function validateToken() {
  const headers = useHeaders();

  try {
    const res = await fetch(`${API_URL}/auth/me`, headers);
    if (!res.ok) throw new Error("Invalid token");
    const data = await res.json();
    return data;
  } catch {
    return null;
  }
}
