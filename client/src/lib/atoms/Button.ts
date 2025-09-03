export function createButton(
  label: string,
  onClick: () => void
): HTMLButtonElement {
  const button = document.createElement("button");
  button.textContent = label;
  button.className = "button";
  button.addEventListener("click", onClick);
  return button;
}
