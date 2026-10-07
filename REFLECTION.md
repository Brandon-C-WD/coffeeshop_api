# Reflection

Building the base routes manually for Part A forced me to wrestle directly with fundamental mechanics like setting up `express.json()`, mounting `express.Router()`, and structuring basic error responses. Writing that code line-by-line created a much more durable understanding because I had to troubleshoot real-world hurdles like Windows terminal formatting and missing middleware myself. In contrast, extending the application with AI for Part B felt faster, but it required strict code verification rather than deep, scratch-built synthesis.

When working on Part B, precise and specific prompt construction worked best. For example, asking for a targeted four-argument error-handling middleware function returned clean, usable code immediately. Conversely, broader prompts about handling errors initially missed Express 4's specific quirk regarding unhandled promise rejections in async route handlers. That difference taught me that AI is most effective when you already understand the underlying architecture well enough to guide and test its output.

Looking ahead to future assignments, I would use AI as a sounding board to quickly review syntax or brainstorm boilerplate patterns. However, I would deliberately avoid using AI to write core routing logic or custom managers from scratch. Relying on AI for foundational concepts bypasses the mental struggle required to internalize how the request-response lifecycle actually functions. True technical retention comes from making mistakes, reading stack traces, and debugging them firsthand.

Schema Prompt: "Write a Mongoose schema for a coffee shop order in Node.js with fields for customer name, items array (each containing name, quantity, price), order status, and total price, including a custom validator for the items array minimum length."

CRUD Handlers: "Create Express router CRUD endpoints (POST, GET, PUT, DELETE) for the coffee shop Order model with basic error handling."

AI Generated: A basic try/catch block returning a generic 500 error status for everything.
My Modification: Updated the error handling to catch specific Mongoose validation errors and return a 400 Bad Request instead, or added custom validation messages.
