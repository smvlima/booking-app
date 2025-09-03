import { API_URL } from "../const";
import { useHeaders } from "../hooks/useHeaders";

export async function getBookings() {
  const headers = useHeaders();

  const res = await fetch(`${API_URL}/bookings`, headers);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to fetch bookings");
  return data;
}
