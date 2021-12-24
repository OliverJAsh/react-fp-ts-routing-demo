const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "src", "index.html"));
});

app.listen(8081);