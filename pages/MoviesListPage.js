import React, { useState, useEffect } from 'react';
import MovieList from '../components/MovieList';

const MoviesListPage = ({ getData })=> {

    const [movies, setMovies] = useState(null);

    useEffect(() => {
		(async () => {
			const data = await getData();
            console.log(data);
			setMovies(data);
		})();
	}, [getData]);

    return <>
        {movies ? <MovieList movies={movies} /> : <p>Loading...</p>}
    </>
};

export default MoviesListPage;