require("dotenv").config({ path: `${__dirname}/config.env` });
const express = require("express");
const authRouter = require("./routes/auth");

// Initialize our express app
const app = express();

// run middleware to parse res.body with json
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Hook in auth Router
app.use("/api/auth", authRouter);

// Initialize Server
app.listen(PORT, () => {
    console.log(`App running on port: ${PORT}`);
});
