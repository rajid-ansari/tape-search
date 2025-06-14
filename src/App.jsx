import { useState, useEffect } from "react";
import Search from "./components/Search";
import MovieCard from "./components/MovieCard";
import { useDebounce } from "react-use";
import Spinner from "./components/Spinner";
import { getTrendingMovies, updateSearchTermCount } from "./appwrite";

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
    const [debounceSearchTerm, setDebounceSearchTerm] = useState("");
    const [trendingMovies, setTrendingMovies] = useState([]);

    useDebounce(() => setDebounceSearchTerm(searchTerm), 500, [searchTerm]);

    const fetchMovies = async (query = "") => {
        setIsLoading(true);
        setErrMessage("");

        try {
            const endpoint = query
                ? `${BASE_URI}/search/movie?include_adult=false&language=en-US&page=1&query=${query}`
                : `${BASE_URI}/discover/movie?include_video=false&language=en-US&page=1&sort_by=popularity.desc`;

            fetch(endpoint, options)
                .then((res) => res.json())
                .then((data) => {
                    if (data.Response === "False") {
                        setErrMessage(data.Error || "Failed to fetch movies");
                        setMovies([]);
                        return;
                    }

                    setMovies(data.results || []);

                    if (query && data.results.length > 0) {
                        updateSearchTermCount(query, data.results[0]);
                    }
                })
                .catch((err) => console.error(err));
        } catch (error) {
            console.log(`error fetching movies :: ${error.message}`);
            setErrMessage("Error fetching movies, try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    const loadTrendingMovies = async () => {
        try {
            const popularMovies = await getTrendingMovies();
            setTrendingMovies(popularMovies);
        } catch (error) {
            console.log(`Load Trending Movies :: ${error.message}`);
        }
    };

    useEffect(() => {
        fetchMovies(debounceSearchTerm);
    }, [debounceSearchTerm]);

    useEffect(() => {
        loadTrendingMovies();
    }, []);

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

                {!debounceSearchTerm && trendingMovies.length > 0 && (
                    <section className="trending">
                        <h2>Trending Movies</h2>
                        <ul>
                            {trendingMovies.map((trendingMovie, index) => (
                                <li key={trendingMovie.$id}>
                                    <p>{index + 1}</p>
                                    <img
                                        src={trendingMovie.poster_url}
                                        alt={trendingMovie.title}
                                    />
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                <h2 className="text-base">All Movies</h2>
                <div className="all-movies text-white my-12">
                    {isLoading ? (
                        <Spinner />
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
