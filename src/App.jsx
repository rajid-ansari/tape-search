import { useState, useEffect } from "react";
import Search from "./components/Search";
import MovieCard from "./components/MovieCard";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URI = import.meta.env.VITE_TMDB_BASE_URI;

const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
    },
};

const App = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errMessage, setErrMessage] = useState("");

    const fetchMovies = async (query = "") => {
        setIsLoading(true);
        setErrMessage("");

        try {
            const endpoint = query
                ? `${BASE_URI}/search/movie?include_adult=false&language=en-US&page=1&query=${query}`
                : `${BASE_URI}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`;

            fetch(endpoint, options)
                .then((res) => res.json())
                .then((data) => setMovies(data.results || []))
                .catch((err) => console.error(err));
        } catch (error) {
            console.log(`error fetching movies :: ${error.message}`);
            setErrMessage("Error fetching movies, try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchMovies(searchTerm);
    }, [searchTerm]);

    return (
        <main>
            <div className="pattern" />
            <div className="wrapper">
                <header>
                    <img src="./hero.png" alt="Hero Banner" />
                    <h1>
                        Find <span className="text-gradient">Movies</span>{" "}
                        You'll Enjoy Without the Hassle.
                    </h1>
                    <Search
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                    />
                </header>

                <h2 className="text-base mt-10">All Movies</h2>
                <div className="all-movies text-white my-12">
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : errMessage ? (
                        <p className="text-red-500">{errMessage}</p>
                    ) : (
                        <ul>
                            {movies.map((movie) => (
                                <MovieCard key={movie.id} movie={movie} />
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </main>
    );
};

export default App;
