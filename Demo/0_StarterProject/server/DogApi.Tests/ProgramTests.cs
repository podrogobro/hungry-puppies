using System.Net;
using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc.Testing;
using Newtonsoft.Json;

namespace DogApi.Tests;

public class DogsApiTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly HttpClient _client;

    public DogsApiTests(WebApplicationFactory<Program> factory)
    {
        _client = factory.CreateClient();
    }

    [Fact]
    public async Task PostDog_ReturnsCreatedResponse()
    {
        // Arrange
        var dog = new Dog { Id = 1, Name = "Fido", Breed = DogBreed.Vizsla, LastFeedingTime = new DateTime(2019, 1, 1) };

        // Act
        var response = await _client.PostAsJsonAsync("/dogs", dog);

        // Assert
        Assert.Equal(HttpStatusCode.Created, response.StatusCode);

        var returnedDog = await response.Content.ReadFromJsonAsync<Dog>(new JsonSerializerOptions
        {
            Converters = { new JsonStringEnumConverter() },
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        });

        Assert.NotNull(returnedDog);

        Assert.Equal(dog.Name, returnedDog.Name);
        Assert.Equal(dog.Breed, returnedDog.Breed);
        Assert.Equal(dog.LastFeedingTime, returnedDog.LastFeedingTime);
    }

    [Fact]
    public async Task GetDogs_ReturnsListOfDogs()
    {
        // Arrange
        var dog2 = new Dog { Id = 3, Name = "Buddy", Breed = DogBreed.Beagle, LastFeedingTime = new DateTime(2019, 1, 1) };
        var dog1 = new Dog { Id = 2, Name = "Fido", Breed = DogBreed.Vizsla, LastFeedingTime = new DateTime(2019, 1, 1) };
        var dog3 = new Dog { Id = 4, Name = "Rex", Breed = DogBreed.Husky, LastFeedingTime = new DateTime(2019, 1, 1) };

        await _client.PostAsJsonAsync("/dogs", dog1);
        await _client.PostAsJsonAsync("/dogs", dog2);
        await _client.PostAsJsonAsync("/dogs", dog3);

        // Act
        var response = await _client.GetAsync("/dogs");

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);

        var returnedDogs = await response.Content.ReadFromJsonAsync<List<Dog>>(new JsonSerializerOptions
        {
            Converters = { new JsonStringEnumConverter() },
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        });

        Assert.NotNull(returnedDogs);
        Assert.Equal(3, returnedDogs.Count);
    }

    // Insert a test that checks the delete method
    [Fact]
    public async Task DeleteDog_ReturnsNoContent()
    {
        // Arrange
        var dog = new Dog { Id = 5, Name = "Fido", Breed = DogBreed.Vizsla, LastFeedingTime = new DateTime(2019, 1, 1) };
        await _client.PostAsJsonAsync("/dogs", dog);

        // Act
        var response = await _client.DeleteAsync($"/dogs/{dog.Id}");

        // Assert
        Assert.Equal(HttpStatusCode.NoContent, response.StatusCode);
    }

    // Insert a test that checks the put method
}