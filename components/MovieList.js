import React from 'react';
import styled from 'styled-components';
import MovieItem from './MovieItem';

const MovieListContainer = styled.div`
    display: flex;
`;

export const MovieList = ({ movies }) => {
    return <>
        {movies.map(movie => (
            movie && <MovieItem key={movie.name} movie={movie} />
        ))}
    </>
};

export default MovieList;