import React from "react";

const MovieCard = ({ movie }) => {
    const {
        title,
        vote_average,
        poster_path,
        release_date,
        original_language,
        overview,
    } = movie;


    return (
        <div className="movie-card">
            <img
                src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : `./no-movie.png`}
                alt="Movie Poster"
                className="h-72"
            />
            <p className="mt-2"> {title} </p>

            <div className="content">
                <div className="rating">
                    <img src="./star.svg" alt="rating" className="h-3" />
                    <p className="text-xs">
                        {" "}
                        {vote_average ? vote_average.toFixed(1) : "N/A"}{" "}
                    </p>
                    <span>• </span>
                    <p> {original_language ? original_language[0].toUpperCase() + original_language[1] : "N/A"} </p>
                    <span>• </span>
                    <p> {release_date ? release_date.split("-")[0] : ""} </p>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
