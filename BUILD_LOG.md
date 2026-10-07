## Problem 1
**What happened:** Encountered a `SyntaxError: Cannot use import statement outside a module` when running `main.js`.
**What I thought was wrong:** I thought Express configuration syntax had completely changed or my installation was broken.
**What was actually wrong:** The project was using ES modules (`import`/`export`), but Node.js defaulted to CommonJS because `"type": "module"` was missing from `package.json`.
**How I found it:** Read the error stack trace pointing directly to the `import` keyword line and traced the module configuration.
**Time spent:** 15 minutes

## Problem 2
**What happened:** A `POST /orders` request returned a `500 Internal Server Error` with a message saying `Cannot destructure property 'customerName' of 'req.body' as it is undefined`.
**What I thought was wrong:** The router logic inside `routes/orders.js` was dropping the incoming data object.
**What was actually wrong:** I had forgotten to include `app.use(express.json());` in `main.js`, so Express didn't know how to parse the incoming JSON payload into `req.body`.
**How I found it:** Looked at the property destructuring error text pointing to `req.body` and realized JSON middleware wasn't registered.
**Time spent:** 10 minutes

## Problem 3
**What happened:** Windows Command Prompt threw a bad hostname/syntax error and broke the `curl` command when using backslashes `\` for multi-line requests.
**What I thought was wrong:** The curl payload structure or headers were malformed.
**What was actually wrong:** Windows Command Prompt does not support line continuation using backslashes the same way bash/Linux terminals do, causing it to execute partial commands.
**What I found:** Noticed the command prompt chopping up lines and executing them separately. I reformatted the command into a single continuous line.
**Time spent:** 10 minutes