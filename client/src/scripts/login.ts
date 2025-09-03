import { login } from "../api/services/login";

export function initLogin() {
  const form = document.getElementById("login-form") as HTMLFormElement;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement)
      .value;

    try {
      const data = await login(email, password);
      console.log("Login successful:", data);

      localStorage.setItem("token", data.token);

      // Redirecionar para dashboard
      //    initDashboard();
    } catch (err: any) {
      alert(err.message); // feedback ao user
    }
  });
}
