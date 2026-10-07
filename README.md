# Coffee Shop API - MongoDB Migration

A RESTful API built with Node.js, Express, and MongoDB (via Mongoose) for managing coffee shop orders with full persistence.

## Project Structure
* `main.js` - Application entry point, Express server configuration, and database connection.
* `models/Order.js` - Mongoose schema and model configuration with data validation.
* `routes/orders.js` - Full CRUD endpoints implementation (`POST`, `GET`, `PUT`, `DELETE`).
* `.env` - Environment variables configuration (excluded from source control).

## Setup & Installation Instructions

1. **Clone or download** the project repository.
2. **Install dependencies**:
   ```bash
   npm install