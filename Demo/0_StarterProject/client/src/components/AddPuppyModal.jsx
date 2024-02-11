// AddPuppyModal.js
import React from "react";
import AddPuppyForm from "./AddPuppyForm";

function AddPuppyModal({ addPuppy, closeModal }) {
  return (
    <div
      id="addPuppyModal"
      className="fixed inset-0 z-50 bg-black bg-opacity-50"
    >
      <div className="flex items-center justify-center h-full">
        <div className="bg-white p-4 rounded-md w-1/3">
          <div className="flex flex-row justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Add Puppy</h2>
            <button className="text-2xl" onClick={closeModal}>
              &times;
            </button>
          </div>
          <AddPuppyForm addPuppy={addPuppy} closeModal={closeModal} />
        </div>
      </div>
    </div>
  );
}

export default AddPuppyModal;
