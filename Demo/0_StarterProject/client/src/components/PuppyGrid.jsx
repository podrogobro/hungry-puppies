import PuppyCard from "./PuppyCard";

const PuppyGrid = ({ puppies, deletePuppy, feedPuppy }) => {
  return (
    <div
      id="puppyGrid"
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-4"
    >
      {puppies.length === 0 ? (
        <div className="text-center col-span-full">No puppies available</div>
      ) : (
        puppies.map((puppy) => (
          <PuppyCard
            key={puppy.id}
            puppy={puppy}
            deletePuppy={deletePuppy}
            feedPuppy={feedPuppy}
          />
        ))
      )}
    </div>
  );
};

export default PuppyGrid;
