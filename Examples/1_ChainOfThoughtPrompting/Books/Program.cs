var builder = WebApplication.CreateBuilder(args);

// Add controllers to the application
builder.Services.AddControllers();

var app = builder.Build();

// Map the /books endpoint to the BooksController
app.MapControllers();

app.Run();