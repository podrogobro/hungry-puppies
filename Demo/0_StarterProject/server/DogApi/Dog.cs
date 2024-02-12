using System.Security.Cryptography.X509Certificates;

namespace DogApi;

public enum DogBreed
{
    Beagle,
    Husky,
    Vizsla,
    Dachshund,
}

public class Dog
{
    public int Id { get; set; }
    public string Name { get; set; }
    public DogBreed? Breed { get; set; }
    public DateTime LastFeedingTime { get; set; }
}
