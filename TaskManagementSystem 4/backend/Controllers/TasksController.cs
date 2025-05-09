using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskManagementSystem.Models;

namespace TaskManagementSystem.Controllers;

[ApiController]
[Route("[controller]")]
public class TasksController : ControllerBase
{
    private readonly AppDbContext _context;

    public TasksController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Models.Task>>> GetTasks()
    {
        return await _context.Tasks.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Models.Task>> GetTask(int id)
    {
        var task = await _context.Tasks.FindAsync(id);
        if (task == null) return NotFound();
        return task;
    }

    // [HttpPost]
    // public async Task<ActionResult<Models.Task>> CreateTask(Models.Task task)
    // {
    //     if (string.IsNullOrEmpty(task.Title))
    //         return BadRequest("Title is required");

    //     if (task.Category != "Work" && task.Category != "Personal")
    //         return BadRequest("Category must be either 'Work' or 'Personal'");

    //     _context.Tasks.Add(task);
    //     await _context.SaveChangesAsync();
    //     return CreatedAtAction(nameof(GetTask), new { id = task.Id }, task);
    // }

// [HttpPost]
// public async Task<ActionResult<Models.Task>> CreateTask([FromBody] Models.Task task)
// {
//     // Basic validation
//     if (string.IsNullOrWhiteSpace(task.Title))
//         return BadRequest("Title is required");
    
//     // Set default values
//     task.CreatedAt = DateTime.UtcNow;
//     task.IsCompleted = task.IsCompleted || false;
    
//     _context.Tasks.Add(task);
//     await _context.SaveChangesAsync();
    
//     return CreatedAtAction(nameof(GetTask), new { id = task.Id }, task);
// }

[HttpPost]
public async Task<ActionResult<Models.Task>> CreateTask([FromBody] Models.Task task)
{
    // Enhanced validation
    if (string.IsNullOrWhiteSpace(task.Title))
        return BadRequest(new { Message = "Title is required" });
    
    if (task.Category != "Work" && task.Category != "Personal")
        return BadRequest(new { Message = "Category must be 'Work' or 'Personal'" });

    // Ensure proper date handling
    if (task.DueDate.HasValue && task.DueDate.Value.Kind == DateTimeKind.Unspecified)
    {
        task.DueDate = DateTime.SpecifyKind(task.DueDate.Value, DateTimeKind.Utc);
    }

    task.CreatedAt = DateTime.UtcNow;
    _context.Tasks.Add(task);
    
    try 
    {
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetTask), new { id = task.Id }, task);
    }
    catch (Exception ex)
    {
        return StatusCode(500, new { Message = "Internal server error", Details = ex.Message });
    }
}



[HttpPut("{id:int}")]
    public async Task<IActionResult> UpdateTask(int id, Models.Task task)
    {
        if (id != task.Id)
            return BadRequest("ID mismatch");

        if (task.Category != "Work" && task.Category != "Personal")
            return BadRequest("Category must be either 'Work' or 'Personal'");

        _context.Entry(task).State = EntityState.Modified;
        
        try 
        {
            await _context.SaveChangesAsync();
            return Ok(task);
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!TaskExists(id)) return NotFound();
            throw;
        }
    }
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTask(int id)
    {
        var task = await _context.Tasks.FindAsync(id);
        if (task == null) return NotFound();

        _context.Tasks.Remove(task);
        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpGet("summary")]
    public async Task<ActionResult<object>> GetTaskSummary()
    {
        var tasks = await _context.Tasks.ToListAsync();
        
        var summary = tasks
            .GroupBy(t => t.Category)
            .Select(g => new {
                Category = g.Key,
                TotalTasks = g.Count(),
                CompletedTasks = g.Count(t => t.IsCompleted),
                CompletionPercentage = (g.Count() > 0) ? 
                    Math.Round((double)g.Count(t => t.IsCompleted) / g.Count() * 100, 2) : 0
            });
            
        return Ok(summary);
    }

    private bool TaskExists(int id) => _context.Tasks.Any(e => e.Id == id);
}