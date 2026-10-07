# AI Collaboration Documentation

## Prompts Used and Effectiveness

1. **"How do I connect an Express.js app to MongoDB using Mongoose with environment variables?"**
   * *Effectiveness:* **Helpful.** Provided a clear template for initializing `mongoose.connect()` inside `main.js` using `process.env.MONGO_URI` and the `dotenv` package.

2. **"How do I fix an `ECONNREFUSED` error when connecting to a local MongoDB service on Windows?"**
   * *Effectiveness:* **Helpful.** Diagnosed that the local Windows MongoDB service wasn't active and guided the switch to MongoDB Atlas free tier for reliable cloud hosting.

3. **"Why am I getting a `querySrv ENOTFOUND` error with my MongoDB Atlas connection string?"**
   * *Effectiveness:* **Helpful.** Helped troubleshoot DNS/network lookup issues and identified a minor punctuation typo in the cluster domain name (`0.09` instead of `0.9`).

## Example of Modification / Fixing AI Suggestion
When setting up the MongoDB Atlas connection string, the AI initially provided a template URI containing placeholder text (`cluster0.xxxxx.mongodb.net`). I had to replace the placeholder with my actual unique cluster identifier (`cluster0.9pmht6s.mongodb.net`) copied directly from the Atlas dashboard, adjust a minor decimal typo in the address, and carefully append my database name (`/coffeeshop`) before the query parameters.

## Reflection
The AI was exceptionally helpful for rapidly generating the Mongoose schema validation rules, structuring asynchronous CRUD route handlers, and troubleshooting cryptic network and DNS errors. However, I still had to handle setting up the cloud cluster manually in the browser, configuring the database user credentials in Atlas, and verifying that environment variables were properly saved in the `.env` file. Overall, the collaboration streamlined the migration process significantly while keeping me fully in control of the project setup.