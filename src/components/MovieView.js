import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

/* Props = {
    id - string with int value between 1-7
}*/
class MovieView extends Component {
    constructor(props) {
        super(props);
        this.state = {                
            title: null,
            characters: null,
            isLoading: true,
        }
    }

    handleOnClick = () => {
        this.setState({
            redirect: true
        });
    }

    componentDidMount(prevProps) {   
        if(prevProps !== this.props){
            // Change this to perform fetch
            const doActualFetch = true; // false


            this.setState({isLoading: true});

            if(doActualFetch) {
                fetch("https://swapi.co/api/films/" + this.props.id)
                .then(results => {return results.json()})
                .then(data => {
                    if (data) {
                        this.setState({
                            title: data.title,
                            characters: data.characters,
                        });
    
                        getNamesLoop();
                    }
                });
    
    
                // Loops requests to get character names
                const getNamesLoop = async _ => {
                    const characters = this.state.characters;
                    if(characters) {
                        const promises = characters.map(async characterUrl => {
                            const characterName = await getCharacterName(characterUrl);
                            return characterName;
                        })
                          
                        const characterNames = await Promise.all(promises);
                        
                        this.setState({
                            characters: characterNames,
                            isLoading: false,
                        });
                    }
                };
            } else {
                this.setState({
                    title: "One Star Wars Movie",
                    characters: [
                        "Jar Jar Binks",
                        "Anakin",
                        "Luke",
                        "Watto"
                    ],
                    isLoading: false,
                });
            }
            
        }
    }
    
    render() {
        if (this.state.redirect) {
            return (<Redirect to="/"/>);
        }

        const characters = this.state.characters;
        let characterItems;

        if (characters !== undefined && characters !== null) {
            characterItems = characters.map((c,i) => {
                return (
                    <div key={"character"+i}>
                        {characters[i]}
                    </div>
                );
            });
        }

        if (this.state.isLoading) {
            return (<div>Loading...</div>); // return (<loadingSpinner />);
        } else {
            return (
                <div className="movie-view">
                        <div className="close-button" onClick={this.handleOnClick}>Close</div>
                        <div className="movie-title-label">{this.state.title}</div>
                        <div className="character-label">Characters</div>
                        <div className="character-list">{characterItems}</div>
                </div>
            );
        }
    }
}

async function getCharacterName(url) {
    return fetch(url)
    .then(results => {return results.json()})
    .then(data => {
        if (data) {
            return data.name;
        }
    });
}

export default MovieView;