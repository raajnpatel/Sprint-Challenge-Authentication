import React, { useState } from "react";
import axiosWithAuth from '../utils/axiosWithAuth';
import "../App.css";
import JokesCard from "./JokesCard";

function Jokes() {
    const [jokeList, setJokeList] = useState([]);
    const getJokes = () => {
        axiosWithAuth()
            .get("/jokes")
            .then(res => console.log("jokes", res) || setJokeList(res.data))
            .catch(error => console.log("Error occured while fetching Jokes", error));
    };


    return (
        <div>
            <button onClick={() => getJokes()}>
                Click to generate a list of jokes!
            </button>
            {jokeList.map(joke => {
                return <JokesCard key = {joke.id}
                                  joke={joke}
                />
            })}
        </div>
    )
}

export default Jokes;