const express = require("express");
const cors = require("cors");
bodyParser = require("body-parser");
const app = express();

var corsOptions = {
    origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./models");
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch((err) => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });

//Routes using Express

app.get("/", (req, res) => {
    res.json({
        message: "Welcome to Upgrad Movie booking application development.",
    });
});

app.get("/movies", (req, res) => {
    res.json({ message: "All Movies Data in JSON format from Mongo DB" });
});

app.get("/genres", (req, res) => {
    res.json({ message: "All Genres Data in JSON format from Mongo DB" });
});

app.get("/artists", (req, res) => {
    res.json({ message: "All Artists Data in JSON format from Mongo DB" });
});

// set port, listen for requests
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});