## Snippet 1

* Symptom: When sending a POST request to `/orders` with a JSON payload, `req.body` evaluates to `undefined`, causing the server to throw a `TypeError` when attempting to access properties on `order` (e.g., reading `item`).
* Specific Cause: The code attempts to access `req.body` without registering Express's built-in JSON body-parsing middleware.
* Corrected Code:
```javascript
const express = require('express');
const app = express();

// Register the JSON body parsing middleware
app.use(express.json());

app.post('/orders', (req, res) => {
    const order = req.body;
    res.status(201).json({ received: order.item });
});

app.listen(3000);

Underlying Rule: Express does not parse incoming request bodies by default. Developers must explicitly mount middleware like express.json() before route handlers can parse and access JSON data in req.body.

## Snippet 2 

* *ymptom: When a client makes a request to GET /orders/pending, the server does not return the pending orders. Instead, it treats the literal string "pending" as an :id parameter and calls orderManager.findById('pending'), which fails or returns 404.
* Specific Cause: Express evaluates routes sequentially in the order they are defined. Because the dynamic parameter route (/orders/:id) is registered before the static route (/orders/pending), the broad :id pattern captures the request first.
* Corrected Code:
const express = require('express');
const app = express();

// Register static routes before dynamic parameterized routes
app.get('/orders/pending', (req, res) => {
    res.json(orderManager.findByStatus('pending'));
});

app.get('/orders/:id', (req, res) => {
    res.json(orderManager.findById(req.params.id));
});

app.listen(3000);

Underlying Rule: Express matches routes sequentially from top to bottom. Specific or static endpoint paths must always be declared before general or parameterized routes (:id) to prevent broad URL patterns from shadowing specific endpoints.

## Snippet 3

Symptom: When a client makes a request to GET /products, the server logs the request to the console, but the HTTP request hangs indefinitely and eventually times out without ever returning a response.
* Specific Cause: The custom middleware logs the request but neither terminates the request-response cycle (via res.json()) nor calls the next() function, causing execution to get stuck indefinitely inside the middleware.
* Corrected Code:
* app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next(); // Pass control to the next middleware or route handler
});

app.get('/products', (req, res) => {
    res.json(products);
});

Underlying Rule: Custom middleware functions that do not terminate the request-response cycle must explicitly invoke the next() callback function to pass control to the subsequent middleware or route handler. Failing to do so freezes the request lifecycle.