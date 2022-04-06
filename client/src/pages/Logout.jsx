import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import endPoint from "../helpers/endPoint";

const Logout = (props) => {
    const {state} = props;
    const navigate = useNavigate();

    const logout = () => {
        axios({
            method: 'POST',
            withCredentials: true,
            url: `${endPoint()}/auth/logout`
        }).then((res) => {
            navigate('/')
            navigate(0);
        }).catch((err) => {
            console.log(err);
            alert('Unable');
        });
    }

    if (state.loggedIn) {
        return (
            <div>
                <h2>Are you sure you want to logout?</h2>
                <div>
                    <button onClick={logout}>Yes</button>
                    <button onClick={() => navigate(-1)}>No</button>
                </div>
            </div>
        )
    }
    return (
        <div>
            <h2>You aren't logged in!</h2>
            <button onClick={() => navigate(-1)}>Back</button>
        </div>
    )
}

export default Logout;