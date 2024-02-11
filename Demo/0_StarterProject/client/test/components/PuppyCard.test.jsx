import React from "react";
import { render, screen } from "@testing-library/react";
import PuppyCard from "../../src/components/PuppyCard";

describe("PuppyCard", () => {
  const puppy = {
    name: "Buddy",
    breed: "Golden Retriever",
  };

  it("renders the puppy's name", () => {
    render(<PuppyCard puppy={puppy} />);
    expect(screen.getByText(puppy.name)).toBeTruthy();
  });

  it("renders the puppy's breed", () => {
    render(<PuppyCard puppy={puppy} />);
    expect(screen.getByText(puppy.breed)).toBeTruthy();
  });

  it("renders the puppy's image", () => {
    render(<PuppyCard puppy={puppy} />);
    expect(screen.getByAltText(puppy.name)).toBeTruthy();
  });
});
