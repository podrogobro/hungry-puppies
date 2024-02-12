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
        var dog = new Dog(1, "Fido", DogBreed.Vizsla, new DateTime(2019, 1, 1));

        // Act
        var response = await _client.PostAsJsonAsync("/dogs", dog);

        // Assert
        Assert.Equal(HttpStatusCode.Created, response.StatusCode);

        var returnedDog = await response.Content.ReadFromJsonAsync<Dog>(new JsonSerializerOptions{
            Converters = { new JsonStringEnumConverter() },
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase 
        });

        Assert.NotNull(returnedDog);

        Assert.Equal(dog.Name, returnedDog.Name);
        Assert.Equal(dog.Breed, returnedDog.Breed);
        Assert.Equal(dog.LastFed, returnedDog.LastFed);
    }
}