import React from "react";
import { render, screen } from "@testing-library/react";
import PuppyCard from "../../src/components/PuppyCard";

describe("PuppyCard", () => {
  const puppy = {
    name: "Buddy",
    breed: "Golden Retriever",
    age: 2,
  };

  it("renders the puppy's name", () => {
    render(<PuppyCard puppy={puppy} />);
    expect(screen.getByText(puppy.name)).toBeTruthy();
  });

  it("renders the puppy's breed", () => {
    render(<PuppyCard puppy={puppy} />);
    expect(screen.getByText(puppy.breed)).toBeTruthy();
  });

  it("renders the puppy's age", () => {
    render(<PuppyCard puppy={puppy} />);
    expect(screen.getByText(`Age: ${puppy.age}`)).toBeTruthy();
  });
});
