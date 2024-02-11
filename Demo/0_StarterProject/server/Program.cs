using System.Text.Json.Serialization;
using Dogs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "CORS",policy  =>
    {
        policy
            .WithOrigins("http://127.0.0.1", "http://localhost", "http://localhost:8080")
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
    db.Dogs.Add(dog);
    await db.SaveChangesAsync();

    return Results.Created($"/dogs/{dog.Id}", dog);
});

// Implement a put method to update a dog
app.MapPut("/dogs/{id}", async (int id, Dog dog, DogDbContext db) =>
{
    if (id != dog.Id)
    {
        return Results.BadRequest("Dog ID mismatch");
    }

    db.Entry(dog).State = EntityState.Modified;
    await db.SaveChangesAsync();

    return Results.NoContent();
});


app.MapDelete("/dogs/{id}", async (int id, DogDbContext db) =>
{
    if (await db.Dogs.FindAsync(id) is Dog dog)
    {
        db.Dogs.Remove(dog);
        await db.SaveChangesAsync();
        return Results.NoContent();
    }

    return Results.NotFound();
});

await app.RunAsync();