require("dotenv").config({ path: `${__dirname}/config.env` });
const express = require("express");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");
const authRouter = require("./routes/auth");
const privateRouter = require("./routes/private");
const cors = require("cors");

// connect db
connectDB();

// Initialize our express app
const app = express();

// implement cors
app.use(cors());

// run middleware to parse res.body with json
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Hook in auth Router
app.use("/api/auth", authRouter);
app.use("/api/private", privateRouter);

// Error handler should be last piece of middleware
app.use(errorHandler);

// Initialize Server
const server = app.listen(PORT, () => {
    console.log(`App running on port: ${PORT}`);
});

// Gracefully shut down server for unexpected errors
process.on("unhandledRejection", (error, promise) => {
    console.log(`Logged Error: ${error}`);
    server.close(() => {
        process.exit(1);
    });
});
