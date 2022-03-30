import React, { useState } from "react";
import {} from "react-router-dom";
import axios from "axios";
import Register from "./Register";
import { Typography } from "antd";
import endPoint from "../helpers/endPoint";
import login from "../helpers/login"

const { Title } = Typography;

const Login = (props) => {
	const { state, onUpdate } = props;
	//const history = useHistory();

	const [password, setPassword] = useState(null);
	const [loginStatus, setLoginStatus] = useState("");
	const [registerClicked, setRegisterClicked] = useState(false);

	const login = () => {
		if (!state.email || !password) {
			setLoginStatus("Please enter your email and password!");
			return;
		}
		axios
			.post(`${endPoint()}/auth/login`, {
				withCredentials: true,
			})
			.then((response) => {
				console.log("response message was ", response);
				if (!response.data.message) {
					//updateOnLogin(onUpdate, response.data[0]);
					//history.push("/");
				} else {
					setLoginStatus(response.data.message);
				}
			});
	};

	if (registerClicked) {
		return (
			<Register
				state={state}
				onUpdate={onUpdate}
				setRegisterClicked={setRegisterClicked}
			/>
		);
	}
	return (
		<div className="Container">
			<div className="content">
				<div className="header">
					<h1>Welcome to TrendTracker</h1>
					<p>
						See The Influence Social Media Has on The Stock and Crypto Markets
					</p>
				</div>
				<div className="login">
					<div className="loginContainer">
						<label class="label">Email</label>
						<input
							type="email"
							onChange={(e) => {
								onUpdate({ email: e.target.value });
							}}
						/>
						<label class="label">Password</label>
						<input
							type="password"
							onChange={(e) => {
								setPassword(e.target.value);
							}}
							onSubmit={login}
						/>
						<div className="buttonContainer">
							<button onClick={login}>Login</button>
							<Title level={4}>Don't have an account?</Title>
							<button
								onClick={() => {
									setRegisterClicked(true);
								}}
							>
								Register
							</button>
							<Title level={3} type="secondary" id="loginStatus">
								{loginStatus}
							</Title>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
