import React, {useState} from 'react';
import axios from 'axios';

const Login = (props) => {
    const [creds, setCreds] = useState({username: "", password: ""});

    // allows for input on login fields
    const handleChange = e => {
        setCreds({...creds, [e.target.name]: e.target.value});
    };

    // fires our axios call to login based on our credentials (in server.js)
    const handleSubmit = e => {
        e.preventDefault();
        axios
            .post('http://localhost:3300/api/auth/login', creds)
            .then(res => {
                console.log(res);
                // using local storage for token to persist through refresh
                localStorage.setItem('token', res.data.token);
                props.history.push("/jokes");
        })
            .catch(err => console.log(err));
    };
    return (
    <form onSubmit={handleSubmit}>
        <input
            type="text"
            name="username"
            placeholder="username"
            onChange={handleChange}
            value={creds.username}
        />
        <input
            type="password"
            name="password"
            placeholder="password"
            onChange={handleChange}
            value={creds.password}
        />
        <button type="submit">Log In</button>
    </form>
    )
};

export default Login;