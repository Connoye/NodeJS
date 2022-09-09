const express = require('express');
const uuid = require('uuid');
const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let movies = [{
    id: 1,
    title: "Whose next?",
    director: "Timmy Tam",
    released: "2022-01-01"
},
{
    id: 2,
    title: "Jimmy Core",
    director: "Kimmy Tate",
    released: "2022-03-01"
},
{
    id: 3,
    title: "Nobody",
    director: "Timmy Tam",
    released: "2022-01-01"
}
];
app.get('/movies', (req, res) => {
    res.json(movies);
});

app.get('/movies/:id', (req, res) => {
    const found = movies.filter(movie => movie.id == (req.params.id));
    if (found.length !== 0) {
        res.json(found);
    } else {
        res.status(404).send("Movie not found");
    }
});

app.post('/movies', (req, res) => {

    const movie = req.body;
    movies.push(movie);
    res.send('Movie was successfully added!');
});

app.delete('/movies/:id', (req, res) => {
    const found = movies.filter(movie => movie.id === parseInt(req.params.id));
    if (found.length !== 0) {
        movies = movies.filter(movie => movie.id !== parseInt(req.params.id));
        return res.send({ msg: 'Movie was deleted successfully', movies });
    }

    return res.status(404).send("Movie not found");
})
app.listen(port, () => {
    console.log(`Server listening at port ${port}`);
})
// module.exports