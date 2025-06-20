import React from "react";

const Search = ({ searchTerm, setSearchTerm }) => {
    return (
        <div className="search">
            <div>
                <img src="./search.svg" alt="Search Icon" />

                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="search from thousands of movies"
                />
            </div>
        </div>
    );
};

export default Search;
