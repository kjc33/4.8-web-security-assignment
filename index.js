const express = require("express");
const { testConnection } = require("./db/conn");
const { authenticateJWT } = require("./middlewares/authMiddleware");

const app = express();
const PORT = 8080;

testConnection();
app.use(express.json());

app.get("/health"),
  (req, res) => {
    res.send("OK");
  };

app.get("/protected", authenticateJWT, (req, res) => {
  res.send("This is a protected route.");
});

// Import Route
const userRoutes = require("./routes/userRoutes");

// Use Routes
app.use("/users", userRoutes.modules);

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
