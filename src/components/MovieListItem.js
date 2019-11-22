import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

/* Props = {
    movieUrl - String with URL for the movie at swapi.co
    title - String with the movies title
    releaseDate - String with the movies release date on the form YYYY-MM-DD
}*/
class MovieListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
        }
    }

    handleOnClick = () => {
        // This maybe should be a modal instead? 
        if (this.props.movieUrl != null && this.props.movieUrl != undefined) {
            this.setState({
                redirect: true
            });
        } else {
            throw "Movie url is null or undefined";
        }
    }

    render() {
        if (this.state.redirect) {
            const urlSplit =  this.props.movieUrl.split('/');
            return (<Redirect to={"/movie/" + urlSplit[urlSplit.length - 2]}/>);
        }
        return (
            <div className="movie-list-item" onClick={this.handleOnClick}>
                <div className="title-text">{this.props.title}</div>
                <div className="release-date-text">{this.props.releaseDate}</div>
            </div>
        );
    }
}



export default MovieListItem;