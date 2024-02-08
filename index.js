const express = require("express");
const { testConnection } = require("./db/conn");
const app = express();
const PORT = 8080;

testConnection();
app.use(express.json());

app.get('/health'), (req, res) => {
    res.send("OK");
}

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
