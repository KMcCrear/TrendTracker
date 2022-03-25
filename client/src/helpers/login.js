import axios from "axios";
import endPoint from "../helpers/endPoint";

const login = (username,password) => {
    return axios({
        method: 'POST',
        url: `${endPoint()}/auth/login`,
        auth: {
            username: username,
            password: password
        },
        withCredentials: true
    }).then((response) => response.data);
};

export default login;