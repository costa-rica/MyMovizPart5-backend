var express = require('express');
var router = express.Router();

console.log(`mon API_KEY: ${process.env.API_KEY}`)
console.log(`mon API_URL: ${process.env.API_URL}`)

router.get('/movies',(req,res) =>{
    console.log(`- dedans movies 🎬`)

    const url_movie_db = `${process.env.API_URL}movie?api_key=${process.env.API_KEY}`
    console.log(`le url pour fetcher: ${url_movie_db}`)
    
    fetch(url_movie_db)
        .then(response => response.json())
        .then(data => {
        const tableauMovies = data.results.map((movieElem, i) =>{
            console.log("une movie")
            return { title: movieElem.title, 
                poster: `https://image.tmdb.org/t/p/original/${movieElem.poster_path}`, 
                voteAverage: movieElem.vote_average, 
                voteCount: movieElem.vote_count, 
                overview: movieElem.overview}
        })
        return res.json({tableauMovies});
    }).catch(err => console.log('error ' + err));
});


module.exports = router;
