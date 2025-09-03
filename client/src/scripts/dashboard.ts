import { createBooking } from "../api/services/createBooking";
import { getBookings } from "../api/services/getBookings";

const form = document.getElementById("login-form") as HTMLFormElement;

form?.addEventListener("submit", async () => {
  const datetime = (document.getElementById("datetime") as HTMLInputElement)
    .value;
  const partySize = (document.getElementById("party-size") as HTMLInputElement)
    .value;
  const note = (document.getElementById("notes") as HTMLInputElement).value;
  if (!datetime || !partySize) return alert("Fill the missing fields");
  try {
    console.log(datetime, partySize, note);

    await createBooking({
      dateTime: new Date(datetime).toISOString().split("T")[0],
      partySize: parseInt(partySize),
      note,
    });
    alert("Booking created!");
    await renderBookings(); // refresh list
  } catch (err: any) {
    alert(err.message);
  }
});

async function renderBookings() {
  const listContainer = document.getElementById("booking-list");
  if (!listContainer) return null;
  try {
    const Bookings = await getBookings();

    listContainer.innerHTML = "";
    Bookings.forEach((r: any) => {
      const div = document.createElement("div");
      div.textContent = `ID: ${r.id} | Date: ${new Date(
        r.date
      ).toLocaleString()} | User: ${r.user.email}`;
      div.style.borderBottom = "1px solid var(--text-color)";
      div.style.padding = "4px 0";
      listContainer.appendChild(div);
    });
  } catch (err: any) {
    listContainer.textContent = err.message;
  }
}

await renderBookings();
