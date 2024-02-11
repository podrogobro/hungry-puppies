using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using Books.Models;

namespace Books.Controller;

[ApiController]
[Route("api/[controller]")]
public class BookController : ControllerBase
{
    private readonly BookContext _context;

    public BookController(BookContext context)
    {
        _context = context;
    }

    [HttpGet]
    public ActionResult<IEnumerable<Book>> GetAllBooks()
    {
        var books = _context.Books.ToList();
        return Ok(books);
    }
}

