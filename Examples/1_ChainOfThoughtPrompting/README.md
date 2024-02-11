# Chain of thought prompting

## Project setup

The project has been created using **GitHub Copilot CLI** suggest.

To create the project for this example GitHub Copilot CLI has been used with the following prompt:

```
gh copilot suggest 'create a dotnet web project using controllers'
```

**Output:** `dotnet new webapi -n MyWebApiProject --use-controllers`

## Creating a controller

We already implemented a Book entity (`Book.cs`) and a database context class (`ApplicationDbContext.cs`) using Entity Framework. The database context has also been registered to the DI service container.

**Our task is to create an endpoint to retrieve the books in the database. The endpoint should also support pagination and filtering the results by genre.**

We can use the **chain-of-thought prompting** technique to create a controller, implement the route handler, and add the required functionalities.

```
Implement a BookController class with a GET endpoint to retrieve all the books in the database using EF database context
```
