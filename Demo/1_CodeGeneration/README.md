# Code generation demo

In this demo we are going to show how GitHub Copilot can be used to aid developers with implementing new features and functionality.

Usint the starter project we are going to implement a functionality where users can **feed their dogs**.

The requirements include

- a dog is considered hungry, if it hasn't been fed for an hour
- display a feed button for every hungry dog
- display a timer counting down to the next feeding time, for every dog that is not hungry

## Exploring the code

Before implementing this new functionality, we can use Copilot to help us understand the functionalities and the more technical implementation details of this project.

We can see that the project is a full-stack web application consisting of a `server` and `client` folder.

### The server

We can start by getting a short summary of the functionality implemented

#### Example prompts

- Summarise the functionality implemented by this API (reference `Program.cs`)

## Code generation

Once we have an overall understanding of the project, we can start adding the desired functionality.

We can start by adding the necesseary properties to indicate when a `Dog` has been fed.

```csharp
// Dog.cs

// Add a property storing the dog's last feeding time
DateTime LastFed
```

Next, we should add an endpoint where the client will be able to update the feeding time of each dog.

```csharp
// Program.cs

// ...

// Implement a PUT method to update a dog, using the injected DogDbContext
app.MapPut("/dogs/{id}", async (int id, Dog dog, DogDbContext db) =>
{
    if (id != dog.Id)
        return Results.BadRequest("IDs do not match");

    db.Entry(dog).State = EntityState.Modified;
    await db.SaveChangesAsync();
    return Results.NoContent();
});

// ...
```

Once we are ready with the backend side, we can turn our attention to the frontend. To implement the functionality, first we need to add a `Feed puppy` button to the `PuppyCard` component.

```js
// PuppyCard.jsx

// Add a button to feed the puppy here
<button
  type="button"
  onClick={() => feedPuppy(puppy.id)}
  className="text-green-700 hover:text-green-800 font-medium w-5 h-5"
>
  Feed
</button>
```

The button should be only dispalyed when the puppy is hungry. To implement this logic we can create a function.

```js
// PuppyCard.js

// Create a function that determines if a puppy is hungry,
// based on the lastFed property, and the feeding interval of 1 hour

const isHungry = () => {
  const lastFed = new Date(puppy.lastFed);
  const now = new Date();
  const timeSinceLastFed = now - lastFed;

  return timeSinceLastFed > 3600000;
};
```

Having given some context and created key components, we can ask copilot to implement the logic to display the Feed button when the puppy is hungry, and a countdown to the next feeding time when the puppy is not hungry.

```js
// Only display the feed button if the puppy is hungry, otherwise
// display a timer counting down to the next feeding time, update the timer every second

const PuppyCard = ({ puppy, deletePuppy }) => {
  const [timeLeft, setTimeLeft] = useState(0);

  const isHungry = () => {
    const lastFed = new Date(puppy.lastFed);
    const now = new Date();
    const timeSinceLastFed = now - lastFed;

    return timeSinceLastFed > 3600000;
  };

  useEffect(() => {
    if (!isHungry()) {
      const lastFed = new Date(puppy.lastFed);
      const now = new Date();
      const timeSinceLastFed = now - lastFed;
      const timeLeft = 3600000 - timeSinceLastFed;

      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1000);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [timeLeft, puppy]);

  return (
    <div className="rounded-lg overflow-hidden shadow-md min-w-32">
      {/* ... */}
      <div className="p-2">
        {/* ... */}
        <div className="flex justify-between items-center">
          {/* ... */}
          {isHungry() ? (
            <button
              type="button"
              onClick={() => feedPuppy(puppy.id)}
              className="text-green-700 hover:text-green-800 font-medium w-5 h-5"
            >
              Feed
            </button>
          ) : (
            <span className="text-center mt-4">{`Next feeding in ${Math.floor(
              timeLeft / 60000
            )} minutes ${Math.floor((timeLeft / 1000) % 60)} seconds`}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default PuppyCard;
```

The functionality of the generated code looks correct, however there is some code duplication for calculating the remaining time until the next feeding. We can utilise copilot to refactor this, by selecting the duplicated code segment (`isHungry` function and `useEffect`) and typing the following prompt:

```
Create a function to calculate the remaining time until the next feeding and call that inside the isHungry function and useEffect
```

The output of the prompt removes the duplication:

```js
// PuppyCard.jsx

// ...

const calculateTimeLeft = () => {
  const lastFed = new Date(puppy.lastFed);
  const now = new Date();
  const timeSinceLastFed = now - lastFed;
  const timeLeft = 3600000 - timeSinceLastFed;

  return timeLeft;
};

const isHungry = () => {
  const timeLeft = calculateTimeLeft();

  return timeLeft < 0;
};

useEffect(() => {
  if (!isHungry()) {
    const timeLeft = calculateTimeLeft();

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1000);
    }, 1000);

    return () => clearTimeout(timer);
  }
}, [timeLeft, puppy]);

// ...
```

The last thing left to do is actually update the `lastFed` property for each dog when the user clicks the `Feed` button.

```js
// App.jsx

// Implement the feedPuppy function here
const feedPuppy = async (id) => {
  try {
    const response = await fetch(`${URI}/${id}`, {
      method: "PUT",
    });
    if (response.ok) {
      fetchPuppies();
    }
  } catch (error) {
    console.error("Error feeding puppy:", error);
  }
};
```

The `feedPuppy` function needs to send the updated puppy in the request body, with the `lastFed` property.

```js
// App.jsx

// Add a puppy property to the function, add the current date time to the puppy's lastFed property,
// and send the puppy in the request body

const feedPuppy = async (id, puppy) => {
  try {
    const response = await fetch(`${URI}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...puppy, lastFed: new Date().toISOString() }),
    });
    if (response.ok) {
      fetchPuppies();
    }
  } catch (error) {
    console.error("Error feeding puppy:", error);
  }
};
```

Also it's important to update the `addPuppy` function to automatically add the `lastFed` property to a newly created puppy, and initialise it to 1 hour before the time of creation.

```js
body: JSON.stringify({
  ...puppy,
  lastFed: new Date(Date.now() - 3600000).toISOString(),
}),
```

To see the feeding and the timer functionality, we can change the feeding interval for 30 seconds.

```js
// PuppyCard.jsx

const calculateTimeLeft = () => {
  // ...
  const timeLeft = 30000 - timeSinceLastFed;

  return timeLeft;
};

// ...
```
