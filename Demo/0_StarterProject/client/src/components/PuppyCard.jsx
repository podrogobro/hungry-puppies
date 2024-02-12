import React from "react";

const PuppyCard = ({ puppy, deletePuppy, feedPuppy }) => {
  return (
    <div className="flex flex-col">
      <div className="rounded-lg overflow-hidden shadow-md min-w-32">
        <img
          className="h-48 w-96 object-cover"
          src={`${process.env.PUBLIC_URL}/img/${puppy.breed.toLowerCase()}.jpg`}
          alt={puppy.name}
        />
        <div className="px-4 py-2">
          <span className="text-sm text-gray-700">{puppy.breed}</span>
          <div className="flex justify-between items-center">
            <span className="font-bold text-xl">{`${puppy.name}`}</span>
            <button
              type="button"
              onClick={() => deletePuppy(puppy.id)}
              className="text-red-700 hover:text-red-800 font-medium"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PuppyCard;
