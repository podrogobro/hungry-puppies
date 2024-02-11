namespace Dogs;

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
    int? Age,
    DateTime LastFeedingTime
);
