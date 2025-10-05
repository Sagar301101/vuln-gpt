const express = require("express");
const dotenv = require("dotenv");
const app = require("./Routes/user.routes");
const connection = require("./config/db");
const cors = require("cors");
dotenv.config();
const server = express();
server.use(cors({
  origin: process.env.CORS_ORIGIN?.split(','),
}));
server.use(express.json());
server.use("/user", app);

// server.use(express.cor);

const PORT = process.env.PORT;

server.get("/", (req, res) => {
  res.send("Health check");
});

server.listen(PORT, async (req, res) => {
  try {
    await connection;
    console.log(`connection to server at PORT ${PORT} and connected to DB`);
    console.log(`Server is running on http://localhost:${PORT}`);
  } catch (error) {}
});
