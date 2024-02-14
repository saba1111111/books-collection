This project lets users share and read books with others. It also tracks reading progress, page by page, opening up future possibilities for creating personalized and engaging user experiences.

To run a project, simply clone or download it and run this command:

```bash
docker compose up
```

## Project Structure

```
src/
 |--auth/           # Defines routes for authentication and authorization processes.
 |--books/          # Routes dedicated to comprehensive book management functionalities.
 |--read-tracking/  # Routes for implementing personalized reading experiences through reading activity tracking.

libs/
 |--auth/           # Implements the business logic for authentication, authorization, and security measures.
 |--books/          # Business logic for a variety of book-related operations.
 |--cache/          # Manages caching mechanisms, including Redis connectivity and operations.
 |--common/         # Contains utilities and functionalities shared across various modules.
 |--database/       # Encapsulates the logic for database connections and interactions.
 |--mail/           # Email service implementation, supporting email sending capabilities.
 |--pages/          # Business logic for managing page-related operations within books.
 |--read-tracking/  # Business logic to monitor and analyze user reading patterns, including books and pages read.
 |--users/          # Comprehensive user management operations.
 |--utils/          # Utility services for encryption, hashing, and generation of unique identifiers.

```

# Database Schema

For those interested in the detailed structure of the database tables and their relationships, we have documented our database schema online. This documentation offers a comprehensive overview of the database architecture, including tables, columns, and relationships between different entities.

You can view the complete database schema at the following link:
[Database Schema Diagram](https://dbdiagram.io/d/65c68256ac844320aed58ff1)

This diagram is designed to provide developers, contributors, and interested parties with a clear understanding of how data is organized and managed within our application. Whether you are looking to contribute to the project, integrate with our system, or simply curious about our data model, this resource offers valuable insights into our backend architecture.

## API Documentation

To view the list of available APIs and their specifications, run the server and go to `http://localhost/api` in your browser. This documentation page is automatically generated using the [swagger](https://swagger.io/) definitions written as comments in the route files.

# Technologies Used

This project is built upon a robust stack of modern technologies, each chosen for its performance, scalability, and ease of integration. Below is a list of the key technologies employed:

- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript, used for its strong typing capabilities and enhanced development experience.
- **NestJS**: A progressive Node.js framework for building efficient and scalable server-side applications. It is used for its comprehensive suite of tools and its support for TypeScript out of the box.
- **PostgreSQL**: An advanced open-source relational database, chosen for its reliability, feature robustness, and active community support.
- **TypeORM**: An ORM (Object-Relational Mapping) library for TypeScript and JavaScript, enabling seamless database interactions through an object-oriented model. It simplifies data manipulation and ensures type safety.
- **Redis**: An in-memory data structure store, used as a database, cache, and message broker. It enhances performance by caching frequently accessed data and supporting various data structures for efficient data management.
