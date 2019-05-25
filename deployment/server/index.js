const express = require("express");

const port = 8080;

const app = express();
app.get("/", (req, res) => {
    res.send("Hello World");
});
app.listen(port, () => {
    console.log(`app running on port ${port}`);
});
