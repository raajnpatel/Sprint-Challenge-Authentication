import React from 'react';

const JokesCard = ({joke}) => {
    return (
        <div>
            <h4>ID: {joke.id}</h4> <h2>Joke: {joke.joke}</h2>
            <br/><br/>
        </div>
    )
};

export default JokesCard;