import { render, screen } from "@testing-library/react";
import App from "../src/App";
import { act } from "react-dom/test-utils";

const MOCK_PUPPIES = [
  {
    id: 1,
    name: "Rex",
    breed: "Beagle",
  },
  {
    id: 2,
    name: "",
    breed: "Husky",
  },
];

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(MOCK_PUPPIES),
  })
);

test("renders hungry puppies title", () => {
  render(<App />);
  const titleElement = screen.getByText("Hungry Puppies 🐶");
  expect(titleElement).toBeTruthy();
});
