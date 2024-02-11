namespace DogApi;

public enum DogBreed {
    Beagle,
    Husky,
    Vizsla,
    Dachshund,
}

public record Dog(
    int Id,
    string Name,
    DogBreed? Breed,
    // Add a property storing the dog's last feeding time
    DateTime? LastFed
);
