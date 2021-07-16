const auth = require("../middleware/auth");

module.exports = (app) => {
    const movies = require("../controllers/movie.controller.js");

    var router = require("express").Router();

    // Retrieve all Movies
    router.get("/", movies.findAllMovies);

    // Retrieve all Movies by status
    router.get("/:status", movies.findAllMovies);

    // Retrieve all Movies by movieId
    router.get("/:id", movies.findOne);

    // Retrieve all published Courses
    router.get(
        "/:status/:title/:genres/:artists/:start_date/:end_date",
        movies.findShows
    );

    app.use("/api/movies", router);
};