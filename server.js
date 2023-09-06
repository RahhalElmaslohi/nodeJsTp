const express = require('express');
const app = express();
const path = require("path");
const request = require('request');
const fs = require('fs');
const {API_KEY } = require('./config.js'); // Assurez-vous d'importer également API_KEY


app.use("/static", express.static(path.resolve(__dirname, 'frontend', 'static')))

app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "index.html"))
    
})


app.listen(PORT, () => {
    console.log("Server is running on PORT", PORT);
});
