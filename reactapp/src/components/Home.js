import React from "react";
import { Link } from "react-router-dom";
const Home = () => {
    return (
        <div>
            <div>Sprint Challenege - Node Authentication / Testing</div>
            <br/>
            <Link to="/login">Click here for Login</Link>
            <br/>
            <Link to='/register'>Click here to Register</Link>
        </div>
    );
};

export default Home;