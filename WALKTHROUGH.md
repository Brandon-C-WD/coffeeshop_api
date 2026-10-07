# Written Walkthrough

## 1. Trace a POST to `/orders` from the moment the request arrives to the moment the response is sent. Name every piece of middleware it passes through, in order.
When a client sends a `POST` request to `/orders`, it enters the application and passes through the following pieces of middleware and handlers in order:
1. **`app.use(express.json())` (Global JSON parsing middleware):** Intercepts the raw incoming request stream, parses the incoming JSON string payload into a JavaScript object, and attaches it to `req.body`.
2. **`app.use('/orders', ordersRouter)` (Router-level matching):** Express matches the base path and delegates control to the orders router.
3. **`validateOrder` middleware (Custom validation layer):** Inspects `req.body` to ensure required fields (`customerName`, non-empty `items` array, and numeric `total`) are present. If invalid, it short-circuits and passes a 400 error to the error handler. If valid, it calls `next()`.
4. **`router.post('/')` (Route handler):** Executes the logic inside the async POST block, creates the new order object, pushes it to the `orders` array, and invokes `res.status(201).json(newOrder)` to send back the response.

---

## 2. What does `express.json()` actually do, and what happens to `req.body` without it?
`express.json()` is a built-in middleware function in Express that reads incoming requests with a `Content-Type: application/json` header, parses the raw data buffer from the HTTP stream into a readable JavaScript object, and populates `req.body` with it. 
* Without it, `req.body` remains `undefined`. Any attempt to read or destructure properties from `req.body` (like `req.body.customerName`) will throw a `TypeError` or trigger an unhandled server error.

---

## 3. What is the difference between `res.send()`, `res.json()`, and `res.end()`? When would you use each?
* **`res.json()`:** Serializes a JavaScript object or array into a valid JSON string, automatically sets the `Content-Type` header to `application/json`, and ends the response. *Use this when building APIs to return structured data.*
* **`res.send()`:** Can handle multiple data types, including strings, buffers, objects, or arrays. It automatically sets headers like `Content-Type: text/html` or `application/json` depending on the input type and ends the response. *Use this when sending HTML snippets or plain text responses.*
* **`res.end()`:** A low-level Express/Node method used to end the response process **without sending any data or body payload**. *Use this only when you need to send a barebones response (like ending a stream or sending status-only headers with no content).*

---

## 4. Point to one line you did not write yourself. Explain what is the piece of code doing and why you kept it.
One common line is `const router = express.Router();`. 
* **What it does:** It creates a new, modular mini-router instance that can handle its own routes separately from the main Express application.
* **Why I kept it:** It allows us to decouple the order-related endpoints into a separate `routes/orders.js` file rather than clumping everything into `main.js`, keeping the codebase modular, maintainable, and clean.

---

## 5. You need to add `GET /orders/:id` returning a single order, and a 404 when the id does not exist. Where does that route go relative to your existing routes, and why does the placement matter?
* The new dynamic route `GET /orders/:id` must be placed **after** any static routes under `/orders` (such as `GET /orders/pending`), but **before** general wildcard/catch-all handlers. However, relative to `GET /orders/`, static paths like `/orders/pending` must come first. If you have specific lookup routes like `/orders/search`, they must be declared before `/:id`.
* The placement matters because Express evaluates routes sequentially from top to bottom. If a dynamic route like `GET /orders/:id` is placed *above* a static route like `GET /orders/pending`, Express will interpret the literal string `"pending"` as an ID parameter (`req.params.id = "pending"`), causing the static route to be shadowed and unreachable[cite: 9].