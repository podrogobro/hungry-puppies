const uri = "http://localhost:5045/dogs";
let dogs = [];

function getDogs() {
  fetch(uri)
    .then((response) => response.json())
    .then((data) => _displayItems(data))
    .catch((error) => console.error("Unable to get dogs.", error));
}

function addDog(event) {
  event.preventDefault();

  const dog = {
    name: document.getElementById("name").value,
    breed: document.getElementById("breed").value,
    age: document.getElementById("age").value,
  };

  fetch(uri, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dog),
  })
    .then(() => getDogs())
    .catch((error) => console.error("Unable to add dog.", error));

  toggleModal();
}

function deleteDog(id) {
  fetch(`${uri}/${id}`, {
    method: "DELETE",
  })
    .then(() => getDogs())
    .catch((error) => console.error("Unable to delete dog.", error));
}

function toggleModal() {
  document.getElementById("addPuppyModal").classList.toggle("hidden");
}

function _displayItems(data) {
  const puppyGrid = document.getElementById("puppyGrid");

  puppyGrid.innerHTML = "";

  data.forEach((puppy) => {
    const card = `
      <div class="rounded-lg overflow-hidden shadow-md min-w-32">
        <img class="h-48 w-96 object-cover" src="assets/img/${puppy.breed.toLowerCase()}.jpg" alt="${
      puppy.name
    }" />
      <div class="p-2">
        <span class="text-sm text-gray-700">${puppy.breed}</span>
        <div class="flex justify-between items-center">
          <span class="font-bold text-xl">${puppy.name}, ${puppy.age}m</span>
          <button type="button" onclick="deleteDog(${
            puppy.id
          })" class="text-red-700 hover:text-red-800 font-medium w-5 h-5">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5">
              <defs>
                <style>.cls-6374f8d9b67f094e4896c66b-1{fill:none;stroke:currentColor;stroke-miterlimit:10;}</style>
              </defs>
              <path class="cls-6374f8d9b67f094e4896c66b-1" d="M16.88,22.5H7.12a1.9,1.9,0,0,1-1.9-1.8L4.36,5.32H19.64L18.78,20.7A1.9,1.9,0,0,1,16.88,22.5Z"></path><line class="cls-6374f8d9b67f094e4896c66b-1" x1="2.45" y1="5.32" x2="21.55" y2="5.32"></line><path class="cls-6374f8d9b67f094e4896c66b-1" d="M10.09,1.5h3.82a1.91,1.91,0,0,1,1.91,1.91V5.32a0,0,0,0,1,0,0H8.18a0,0,0,0,1,0,0V3.41A1.91,1.91,0,0,1,10.09,1.5Z"></path><line class="cls-6374f8d9b67f094e4896c66b-1" x1="12" y1="8.18" x2="12" y2="19.64"></line><line class="cls-6374f8d9b67f094e4896c66b-1" x1="15.82" y1="8.18" x2="15.82" y2="19.64"></line><line class="cls-6374f8d9b67f094e4896c66b-1" x1="8.18" y1="8.18" x2="8.18" y2="19.64"></line></svg>
          </button>
        </div> 
      </div>
    </div>
    `;

    puppyGrid.innerHTML += card;
  });

  if (data.length === 0) {
    puppyGrid.innerHTML = `<p class="text-center py-4 col-span-full">No puppies to display</p>`;
  }

  dogs = data;
}
