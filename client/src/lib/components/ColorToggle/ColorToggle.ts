export function createColorToggle(): HTMLButtonElement {
  const btn = document.createElement("button");
  btn.textContent = "🌙"; // default icon

  btn.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    if (currentTheme === "dark") {
      document.documentElement.setAttribute("data-theme", "light");
      btn.textContent = "🌙";
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
      btn.textContent = "☀️";
    }
  });

  return btn;
}
