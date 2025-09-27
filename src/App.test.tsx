import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

test("renders main heading", () => {
  render(<App />);
  expect(
    screen.getByRole("heading", {name: /vite \+ react/i})
  ).toBeInTheDocument();
});

test("renders Vite and React logos with correct alt text", () => {
  render(<App />);
  expect(screen.getByAltText(/vite logo/i)).toBeInTheDocument();
  expect(screen.getByAltText(/react logo/i)).toBeInTheDocument();
});

test("renders external links", () => {
  render(<App />);
  const viteLink = screen.getByRole("link", {name: /vite logo/i});
  const reactLink = screen.getByRole("link", {name: /react logo/i});

  expect(viteLink).toHaveAttribute("href", "https://vite.dev");
  expect(reactLink).toHaveAttribute("href", "https://react.dev");
});

test("counter increments when clicked", async () => {
  const user = userEvent.setup();
  render(<App />);

  const button = screen.getByRole("button", {name: /count is/i});
  await user.click(button);
  expect(button).toHaveTextContent("count is 1");

  await user.click(button);
  expect(button).toHaveTextContent("count is 2");
});
