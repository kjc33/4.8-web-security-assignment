const express = require("express");
const app = express();
const dotenv = require('dotenv');

const PORT = 8080;

app.use(express.json());

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
