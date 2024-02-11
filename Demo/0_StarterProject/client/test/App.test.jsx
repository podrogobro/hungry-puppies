import { render, screen } from "@testing-library/react";
import App from "../src/App";

test("renders hungry puppies title", () => {
  render(<App />);
  const titleElement = screen.getByText("Hungry Puppies 🐶");
  expect(titleElement).toBeTruthy();
});
