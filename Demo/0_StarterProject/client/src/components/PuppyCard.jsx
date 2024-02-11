import React, { useEffect, useState } from "react";

const PuppyCard = ({ puppy, deletePuppy, feedPuppy }) => {
  const [timeLeft, setTimeLeft] = useState(0);

  const calculateTimeLeft = () => {
    const lastFed = new Date(puppy.lastFed);
    const now = new Date();
    const timeSinceLastFed = now - lastFed;
    const timeLeft = 30000 - timeSinceLastFed;

    return timeLeft;
  };

  const isHungry = () => calculateTimeLeft() < 0;

  useEffect(() => {
    if (!isHungry()) {
      const timeLeft = calculateTimeLeft();

      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1000);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [timeLeft, puppy]);

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

      {isHungry() ? (
        <button
          type="button"
          onClick={() => feedPuppy(puppy)}
          className="text-white rounded-lg bg-sky-500 hover:bg-sky-700 font-medium mt-4 py-2 px-4"
        >
          Feed
        </button>
      ) : (
        <span className="text-center mt-4">{`Next feeding in ${Math.floor(
          timeLeft / 60000
        )} minutes ${Math.floor((timeLeft / 1000) % 60)} seconds`}</span>
      )}
    </div>
  );
};

export default PuppyCard;

/**

 */
