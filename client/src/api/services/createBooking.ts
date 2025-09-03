import { API_URL } from "../const";
import { useHeaders } from "../hooks/useHeaders";

export async function createBooking(payload: {
  dateTime: string;
  partySize: number;
  note: string;
}) {
  const headers = useHeaders();

  const res = await fetch(`${API_URL}/bookings`, {
    ...headers,
    method: "POST",
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to fetch bookings");
  return data;
}
