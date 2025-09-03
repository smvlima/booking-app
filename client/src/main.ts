import { getEnterPageWithValidation } from "./scripts/getEnterPageWithValidation";

document.addEventListener("DOMContentLoaded", async () => {
  getEnterPageWithValidation();
  document.documentElement.setAttribute("data-theme", "light");
});

document.querySelector("#logout-button")?.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("click btn logout");
  localStorage.removeItem("token");
  getEnterPageWithValidation();
});

document.querySelector("#toggle-button")?.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("click toggleButton logout");
});
