import axios from 'axios';

const axiosWithAuth = () => {
    return axios
        .create({
            baseURL: "http://localhost:3300/api",
            headers: {
                "Content-Type": "application/json",
               "Authorization": localStorage.getItem('token')
            },
            withCredentials: true
        });
};

export default axiosWithAuth;