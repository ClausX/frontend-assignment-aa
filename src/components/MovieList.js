import React, { Component } from 'react';
import MovieListItem from './MovieListItem';

class MovieList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: null,
            isLoading: true,
        }
    }

    componentDidMount() {
        // Change this to perform fetch
        const doActualFetch = true; // false
        
        this.setState({ isLoading: true });
        // I don't know what happened here. Something broke. Potentially swapi.co, so I'm gonna leave this for now
        if (doActualFetch){
            fetch("https://swapi.co/api/films/") // no-cors?
            .then(results => {return results.json()})
            .then(data => {
                if (data && data.results) {
                    this.setState({
                        movies: data.results,
                        isLoading: false
                    });
                }
            });
        } else {
            // mock solution, since something broke
            this.setState({
                movies: [{
                    url: "https://swapi.co/api/films/1",
                    title: "One Star Wars Movie",
                    release_date: "1999-12-12"
                },
                {
                    url: "https://swapi.co/api/films/1",
                    title: "One Star Wars Movie",
                    release_date: "1999-12-12"
                }],
                isLoading: false
            })
        }
    }
    
    
    render() {
        const movies = this.state.movies;
        let movieItems;
        if (movies !== undefined && movies !== null) {
            movies.sort((a, b) => (a.release_date > b.release_date) ? 1 : -1)
            movieItems = movies.map((m,i) => {
                return (
                    <div key={"movie"+i}>
                        <MovieListItem 
                            movieUrl={m.url}
                            title={m.title}
                            releaseDate={m.release_date}></MovieListItem>
                    </div>
                );
            });
        } else {
            return (<div>Loading...</div>); // return (<loadingSpinner />);
        }
        return (
            <div className="movie-list">
                {movieItems}
            </div>
        );
    }
}

export default MovieList;