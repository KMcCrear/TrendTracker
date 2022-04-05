import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Register from "./Register";
import { Typography } from "antd";
import loginHelper from "../helpers/login"

const { Title } = Typography;

const Login = (props) => {
	const { state, onUpdate } = props;
	const navigate = useNavigate();

	const [username,setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [loginStatus, setLoginStatus] = useState("");
	const [registerClicked, setRegisterClicked] = useState(false);

	const login = () => {
		if (username == "" || password == "") {
			setLoginStatus("Please enter your email and password!");
		}
		else {
			loginHelper(username,password)
			.then((response) => {
				navigate('/')
				navigate(0);
			}).catch((err) => {
				if (err.response.status == 401) {
					setLoginStatus('Incorrect username or password!');
				}
				else {
					console.log(err)
					alert("Unable");
				}
			});
		}
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
						<label class="label">Username</label>
						<input
							type="username"
							onChange={(e) => {
								setUsername(e.target.value)
							}}
						/>
						<label className="label">Password</label>
						<input
							type="password"
							onChange={(e) => {
								setPassword(e.target.value);
							}}
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
