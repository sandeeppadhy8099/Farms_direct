<<<<<<< HEAD
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./db"); // just to make sure it connects

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/products", require("./routes/products"));

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
=======
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./db"); // just to make sure it connects

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/products", require("./routes/products"));

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
>>>>>>> 657421e798694f48d230a82f254c87e45b6588ce
