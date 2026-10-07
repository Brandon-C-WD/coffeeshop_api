## Tool(s) used
Gemini / AI Collaborator

## Prompt 1
**What I asked:** How do I write a 4-argument error-handling middleware in Express and handle errors inside async route handlers correctly?
**What came back:** Provided an example of an `app.use((err, req, res, next))` block and explained that Express 4 async functions need explicit `try...catch` blocks passing errors to `next(err)`.
**Response quality (1-5):** 5
**What I verified:** Verified against the Express Guide on "Writing error handlers" (expressjs.com) confirming that middleware with four arguments `(err, req, res, next)` is specifically recognized by Express as an error-handling middleware, and that Express 4 requires manual error propagation for rejected promises in async functions.
**What I changed and why:** Added explicit `try...catch` blocks around async route handler logic in `routes/orders.js` because unhandled rejections in Express 4 bypass centralized error middleware unless caught and forwarded with `next(err)`.