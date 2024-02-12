import React, { useState } from "react";
import AddPuppyModal from "./components/AddPuppyModal";
import PuppyGrid from "./components/PuppyGrid";

const URI = "http://localhost:5045/dogs";

function App() {
  const [puppies, setPuppies] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Call fetchPuppies when the component mounts
  React.useEffect(() => {
    fetchPuppies();
  }, []);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  // Implement the fetchPuppies function here
  const fetchPuppies = async () => {
    try {
      const response = await fetch(URI);
      const data = await response.json();
      setPuppies(data);
    } catch (error) {
      console.error("Error fetching puppies:", error);
    }
  };

  // Implement addPuppy function here
  const addPuppy = async (puppy) => {
    try {
      const response = await fetch(URI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...puppy,
          lastFed: new Date(Date.now() - 3600000).toISOString(),
        }),
      });
      if (response.ok) {
        fetchPuppies();
      }
    } catch (error) {
      console.error("Error adding puppy:", error);
    }
  };

  // Implement the deletePuppy function here
  const deletePuppy = async (id) => {
    try {
      const response = await fetch(`${URI}/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchPuppies();
      }
    } catch (error) {
      console.error("Error deleting puppy:", error);
    }
  };

  //
  // implement the feedPuppy function here
  //

  return (
    <div className="flex flex-col px-24 pt-12">
      <div className="flex flex-row justify-between items-center mb-4">
        <h1 className="text-center text-sky-500 text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl dark:text-white">
          Hungry Puppies 🐶
        </h1>
        <button
          id="showAddPuppyModal"
          className="px-4 py-2 text-white bg-sky-500 hover:bg-sky-700 rounded-md align-middle"
          onClick={toggleModal}
        >
          Add Puppy
        </button>
      </div>

      <PuppyGrid
        puppies={puppies}
        deletePuppy={deletePuppy}
        feedPuppy={() => void 0}
      />

      {showModal && (
        // Render your add puppy modal component here
        <AddPuppyModal addPuppy={addPuppy} closeModal={toggleModal} />
      )}
    </div>
  );
}

export default App;
