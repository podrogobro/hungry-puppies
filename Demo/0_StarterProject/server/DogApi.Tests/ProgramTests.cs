using System.Net;
using System.Text.Json;
using System.Text.Json.Serialization;
using Newtonsoft.Json;

namespace DogApi.Tests;

public class DogsApiTests : IClassFixture<CustomWebApplicationFactory<Program>>
{
    private readonly HttpClient _client;

    public DogsApiTests(CustomWebApplicationFactory<Program> factory)
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

        Console.WriteLine(await response.Content.ReadAsStringAsync());

        // Assert
        Assert.Equal(HttpStatusCode.Created, response.StatusCode);
   
        var options = new JsonSerializerOptions();
        options.Converters.Add(new JsonStringEnumConverter());

        // TODO: Fix this
        var returnedDog = await response.Content.ReadFromJsonAsync<Dog>(options);

        Assert.Equal(dog.Name, returnedDog.Name);
    }
}