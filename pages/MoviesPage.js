import React, { useState } from 'react';
import styled from 'styled-components';
import MoviesListPage from './MoviesListPage';
import apiUrls from '../config';

const apiUrl = apiUrls.MOVIES;

const FilterForm = styled.div`
    border-radius: 8px;
    padding: 16px;
    text-align: center;
    box-shadow: 0 4px 8px grey;
`;

const Input = styled.input`
    font-size: 16px;
    padding: 8px;
    border: none;
    border-bottom: 2px solid #ddd;
    border-radius: 8px;
    width: 70%;
    outline: none;
`;

const FilterDataButton = styled.button`
    font-size: 16px;
    padding: 8px;
    border: none;
    border-radius: 8px;
    outline: none;
    cursor: pointer;
    margin-left: 8px;
    width: 20%;
    background-color: #22ee22;
`;

const MoviesPage = ({ getData = () => {} })=> {

    const [inputValue, setInputValue] = useState('');
    const [filterBy, setFilterBy] = useState('');

    return <>
        <FilterForm>
            <Input
                type="text"
                placeholder='Movie name'
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
            />
            <FilterDataButton
                onClick={() => {
                    setFilterBy(inputValue);
                }}>
                    Filter
            </FilterDataButton>
        </FilterForm>
        <MoviesListPage getData={getData(filterBy ? `${apiUrl}?filterByMovieName=${filterBy}` : apiUrl)} />
        </>
};

export default MoviesPage;