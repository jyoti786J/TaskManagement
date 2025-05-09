using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using TaskManagementSystem.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services
builder.Services.AddControllers();
builder.Services.AddDbContext<AppDbContext>(opt => opt.UseInMemoryDatabase("TaskDB"));
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Enable CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder => builder
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader());
});


var app = builder.Build();


app.UseCors("AllowAll");



// Middleware pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.MapFallbackToFile("index.html");
app.UseRouting();
app.UseCors("AllowReactFrontend");
app.UseAuthorization();

app.MapControllers();
app.Use(async (context, next) => {
    Console.WriteLine($"Request: {context.Request.Method} {context.Request.Path}");
    await next();
});
// Seed initial data
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    if (!db.Tasks.Any())
    {
        db.Tasks.AddRange(
            new TaskManagementSystem.Models.Task{ 
                Title = "Complete project", 
                Description = "Finish the API", 
                Category = "Work", 
                IsCompleted = false,
                DueDate = DateTime.Now.AddDays(7)
            },
            new TaskManagementSystem.Models.Task { 
                Title = "Buy groceries", 
                Description = "Milk, eggs, bread", 
                Category = "Personal", 
                IsCompleted = true,
                DueDate = DateTime.Now.AddDays(1)
            }
        );
        db.SaveChanges();
    }
}

app.Run();