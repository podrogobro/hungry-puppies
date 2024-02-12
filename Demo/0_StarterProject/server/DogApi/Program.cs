using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using DogApi;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "CORS", policy =>
    {
        policy
            .WithOrigins("http://127.0.0.1", "http://localhost", "http://localhost:3000")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

builder.Services.ConfigureHttpJsonOptions(options =>
{
    options.SerializerOptions.Converters.Add(new JsonStringEnumConverter());
});
builder.Services.Configure<JsonOptions>(options =>
{
    options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<DogDbContext>(options => options.UseInMemoryDatabase("Dogs"));

var app = builder.Build();

app.UseCors("CORS");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapGet("/dogs", async (DogDbContext db) =>
    await db.Dogs.ToListAsync());


app.MapGet("/dogs/{id}", async (int id, DogDbContext db) =>
    await db.Dogs.FindAsync(id)
        is Dog dog
            ? Results.Ok(dog)
            : Results.NotFound());

app.MapPost("/dogs", async (Dog dog, DogDbContext db) =>
{
    Console.WriteLine("POST /dogs");

    db.Dogs.Add(dog);
    await db.SaveChangesAsync();

    return Results.Created($"/dogs/{dog.Id}", dog);
});

app.MapPut("/dogs/{id}", async (int id, Dog updatedDog, DogDbContext db) =>
{
    Console.WriteLine("PUT /dogs/{id}");

    var existingDog = await db.Dogs.FindAsync(id);
    if (existingDog == null)
    {
        return Results.NotFound();
    }
    existingDog = updatedDog;

    // db.Entry(existingDog).State = EntityState.Modified;
    await db.SaveChangesAsync();

    return Results.NoContent();
});



app.MapDelete("/dogs/{id}", async (int id, DogDbContext db) =>
{
    Console.WriteLine("DELETE /dogs/{id}");

    if (await db.Dogs.FindAsync(id) is Dog dog)
    {
        db.Dogs.Remove(dog);
        await db.SaveChangesAsync();
        return Results.NoContent();
    }

    return Results.NotFound();
});

await app.RunAsync();

public partial class Program { }