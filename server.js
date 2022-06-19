const express = require('express');
const next = require('next');
const fs = require('fs');
const moviesFileLocation = './data/movies.json';
const data = JSON.parse(fs.readFileSync(moviesFileLocation));
const apiUrls = require('./config');
const port = 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

function saveDataFile() {
    fs.writeFile(moviesFileLocation, JSON.stringify(data), function(err) {
        if(err) {
            throw new Error('File save error!')
        }
    });     
}

app.prepare()
    .then(() => {
        const server = express();
        server.use(express.json());
        // todo: edit, add pages to front
        server.get('/add-movie', (req, res) => {
            console.log('todo: add page');
            return app.render(req, res, '/AddMovie');
        });

        // get movies, filter by parameter filterByMovieName
        server.get(apiUrls.MOVIES, (req, res) => {

            const returnData =
                req.query.filterByMovieName
                ? data.filter(movie => 
                    movie && movie.name.toLowerCase().includes(
                        req.query.filterByMovieName.toLowerCase()
                        ))
                : data;
            res.status(200).json(returnData);
        });

        // add new movie
        server.post(apiUrls.MOVIES, (req, res) => {
            const { movie: newMovie } = req.body;

            console.log('----------');
            console.log(newMovie);
            console.log('----------');

            // possible validation
            const isValidatedOk = true;
            //

            if (newMovie && isValidatedOk) {
                data.push(newMovie);
                saveDataFile();
            } else {
                throw new Error("Payload format invalid or null");
            }

            res.status(200).json(newMovie);
        });

        // remove movie
        server.delete(`${apiUrls.MOVIES}/:name`, (req, res) => {
            const name = req.params.name;

            const removeMovieIndex = data.findIndex(movie => movie.name === name);

            if (removeMovieIndex > -1) {
                data.splice(removeMovieIndex, 1);
                saveDataFile();
                res.status(200).send('OK');
            } else {
                throw new Error("No movie found with that name");
            }
            
        });

        server.get('*', (req, res) => {
            return handle(req, res);
        })
        
        server.listen(port, (error) => {
            if (error) throw error;
            console.log(`Valmiina tarjoilemaan leffoja http://localhost:${port}`);
        });
    })



