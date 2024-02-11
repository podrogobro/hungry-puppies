import { render, screen, fireEvent } from "@testing-library/react";
import AddPuppyForm from "../../src/components/AddPuppyForm";

describe("AddPuppyForm", () => {
  test("renders AddPuppyForm correctly", () => {
    render(<AddPuppyForm addPuppy={() => {}} closeModal={() => {}} />);

    // Assert that the form elements are rendered correctly
    const nameInput = screen.getByLabelText("Name");
    expect(nameInput).toBeTruthy();

    const breedSelect = screen.getByLabelText("Select an option");
    expect(breedSelect).toBeTruthy();

    const addButton = screen.getByRole("button", { name: "Add Puppy" });
    expect(addButton).toBeTruthy();
  });

  test("calls addPuppy and closeModal functions on form submission", () => {
    const addPuppyMock = jest.fn();
    const closeModalMock = jest.fn();

    render(
      <AddPuppyForm addPuppy={addPuppyMock} closeModal={closeModalMock} />
    );

    // Simulate user input and form submission
    const nameInput = screen.getByLabelText("Name");
    fireEvent.change(nameInput, { target: { value: "Buddy" } });

    const breedSelect = screen.getByLabelText("Select an option");
    fireEvent.change(breedSelect, { target: { value: "Beagle" } });

    const addButton = screen.getByRole("button", { name: "Add Puppy" });
    fireEvent.click(addButton);

    // Assert that addPuppy and closeModal functions are called with the correct arguments
    expect(addPuppyMock).toHaveBeenCalledWith({
      name: "Buddy",
      breed: "Beagle",
    });
    expect(closeModalMock).toHaveBeenCalled();
  });
});
