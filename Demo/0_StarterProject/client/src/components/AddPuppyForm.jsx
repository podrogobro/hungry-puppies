// AddPuppyForm.js
import React, { useState } from "react";

function AddPuppyForm({ addPuppy, closeModal }) {
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // Create a new puppy object from form data and call addPuppy
    addPuppy({ name, breed });

    // Clear the form
    setName("");
    setBreed("");

    // Close the modal
    closeModal();
  };

  return (
    <form
      id="addPuppyForm"
      className="flex flex-col gap-4"
      onSubmit={handleSubmit}
    >
      <div>
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Name
        </label>
        <input
          required
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>

      <div>
        <label
          htmlFor="breed"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Select an option
        </label>
        <select
          required
          id="breed"
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="">Choose breed</option>
          <option value="Beagle">Beagle</option>
          <option value="Vizsla">Vizsla</option>
          <option value="Husky">Husky</option>
        </select>
      </div>

      <button
        type="submit"
        className="px-4 py-2 text-white bg-sky-500 rounded-md"
      >
        Add Puppy
      </button>
    </form>
  );
}

export default AddPuppyForm;
