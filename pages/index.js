import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MoviesPage from './MoviesPage';

const getData = url => async () => {
	const response = await axios.get(url);
	return response.data;
}

const Index = ()=> {
    return <MoviesPage getData={getData}/>
};

export default Index;