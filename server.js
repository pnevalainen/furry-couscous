const express = require('express');
const next = require('next');
const fs = require('fs');
//const res = require('express/lib/response');
const moviesFileLocation = './data/movies.json';
const data = JSON.parse(fs.readFileSync(moviesFileLocation));
const apiUrls = require('./config');
const port = 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

console.log(data);

app.prepare()
    .then(() => {
        const server = express();
        server.use(express.json());
        server.get('/page2', (req, res) => {
            return app.render(req, res, '/page2');
        })
        // get movies, filter by parameter filterByMovieName
        server.get(apiUrls.MOVIES, (req, res) => {
            const returnData =
                req.query.filterByMovieName
                ? data.filter(movie => movie.name.toLowerCase().includes(req.query.filterByMovieName.toLowerCase()))
                : data;
            res.status(200).json(returnData);
        });
        // add new movie
        server.post(apiUrls.MOVIES, (req, res) => {
            const { movie: newMovie } = req.body;
        
            data.push(newMovie);

            fs.writeFile(moviesFileLocation, data, function(err) {
                if(err) {
                    throw new Error('File save error!')
                }
            }); 
            res.status(200).json(newMovie);
        });
        // remove movie
        server.delete(`${apiUrls.MOVIES}/:name`, (req, res) => {
            const name = req.params.name;

            data.splice(data.findIndex(movie => movie.name === name), 1);

            fs.writeFile(moviesFileLocation, data, function(err) {
                if(err) {
                    throw new Error('File save error!')
                }
            }); 
            res.status(200).send('OK');
        });

        server.get('*', (req, res) => {
            return handle(req, res);
        })
        
        server.listen(port, (error) => {
            if (error) throw error;
            console.log(`Valmiina http://localhost:${port}`);
        });
    })



