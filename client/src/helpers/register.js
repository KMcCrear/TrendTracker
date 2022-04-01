import axios from "axios";
import endPoint from "../helpers/endPoint";

const register = (forename, surname, username,password) => {
    return axios({
        method: 'POST',
        url: `${endPoint()}/auth/register/${forename}/${surname}`,
        auth: {
            username: username,
            password: password
        },
        responseType: 'text',
        withCredentials: true
    }).then((response) => response.data);
};

export default register;