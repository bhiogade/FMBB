const db = require("../models");
const Movie = db.movies;

// Retrieve all Movies from the database by status.
// if no status is passed then all movies are retrieved
exports.findAllMovies = (req, res) => {
    const status = req.query.status;
    var condition = status
        ? { status: { $regex: new RegExp(status), $options: "i" } }
        : {};

    Movie.find(condition)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Movies.",
            });
        });
};

// Find a single Movie with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Movie.findById({ _id: id })
        .then((data) => {
            if (!data)
                res.status(404).send({ message: "Not found Movie with id " + id });
            else res.send(data);
        })
        .catch((err) => {
            res.status(500).send({ message: "Error retrieving Movie with id=" + id });
        });
};

// Find shows of Movie with an id
exports.findShows = (req, res) => {
    const id = req.params.id;

    Movie.findById({ _id: id })
        .then((data) => {
            if (!data)
                res
                    .status(404)
                    .send({ message: "Not found Shows of Movie with id " + id });
            else res.send(data.shows);
        })
        .catch((err) => {
            res.status(500).send({ message: "Error retrieving Shows with id=" + id });
        });
};