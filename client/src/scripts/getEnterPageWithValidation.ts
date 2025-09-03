import { validateToken } from "../api/services/validateToken";
import { initLogin } from "./login";

export async function getEnterPageWithValidation() {
  const root = document.getElementById("app");

  if (!root) return;

  const token = localStorage.getItem("token");
  if (token) {
    const validUser = await validateToken();
    if (validUser) {
      const res = await fetch("index.html");
      root.innerHTML = await res.text();
    }
  } else {
    const res = await fetch("src/lib/pages/login.html");
    root.innerHTML = await res.text();
    initLogin();
  }
}
