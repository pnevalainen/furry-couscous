import React, { useState } from 'react';
import styled from 'styled-components';

const MovieItemContainer = styled.div`
    background: #fff;
    border-radius: 8px;
    margin-top: 8px;
    padding: 16px;
    position: relative;
    box-shadow: 0 4px 8px grey;
`;

const Genre = styled.div`
    border: 1px solid grey;
    border-radius: 8px;
    padding: 4px;
    margin-right: 4px;
`;

const GenreContainer = styled.div`
    display: flex;
`;

const renderGenres = genres => (
    <GenreContainer>
        {genres.map(genre => (
            <Genre key={genre}>{genre}</Genre>
            ))}
    </GenreContainer>
);

export const MovieItem = ({ movie }) => {
    return (
        <MovieItemContainer>
            <h3>{movie.name}</h3>
            <p>Year: {movie.year} | Age limit: {movie.ageLimit}</p>
            {renderGenres(movie.genres)}
            <p>{movie.synopsis}</p>
            <p><b>Director:&nbsp;</b>{movie.director.firstName + " " + movie.director.lastName}</p>
            <p><b>Stars:&nbsp;</b>{movie.actors.map(actor => `${actor.firstName} ${actor.lastName}`).join()}</p>
        </MovieItemContainer>
    )
};
export default MovieItem;