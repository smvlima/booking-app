import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import "@testing-library/jest-dom";

test("should render the app", () => {
  render(<App />);
  const linkElement = screen.getByTestId("app-container");
  expect(linkElement).toBeInTheDocument();
});
