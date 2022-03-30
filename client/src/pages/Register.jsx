import { React, useState } from "react";
import ReorderIcon from "@material-ui/icons/Reorder";
import axios from "axios";
import { Button } from "antd";
import {} from "react-router-dom";
import { CaretLeftOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import updateOnLogin from "../helpers/updateOnLogin";
import endpoint from "../helpers/endPoint";

const Register = (props) => {
	//const history = useHistory();

	const { state, onUpdate, setRegisterClicked } = props;
	const [firstNameReg, setFirstNameReg] = useState(null);
	const [surNameReg, setSurNameReg] = useState(null);
	const [username, setUsername] = useState(null);
	const [passwordReg, setPasswordReg] = useState(null);
	const [passwordTwoReg, setPasswordTwoReg] = useState(null);
	const [registerStatus, setRegisterStatus] = useState(null);

	const registerUser = () => {
		if (
			!firstNameReg ||
			!surNameReg ||
			!username ||
			!passwordReg ||
			!passwordTwoReg
		) {
			setRegisterStatus("Please fill in the fields!");
		} else if (passwordReg !== passwordTwoReg) {
			setRegisterStatus("Passwords don't match!");
		} else {
			const data = {
				firstname: firstNameReg,
				surname: surNameReg,
				username: username,
				password: passwordTwoReg,
			};
			axios.post(`${endpoint()}/auth/register`, data).then((response) => {
				if (response.data.message) {
					setRegisterStatus(response.data.message);
				} else {
					console.log("data is ", data);
					axios
						.post(`${endpoint()}/login`, {
							username: username,
							password: passwordTwoReg,
						})
						.then((response) => {
							updateOnLogin(onUpdate, response.data[0]);
							//history.push("/");
						});
				}
			});
		}
	};

	return (
		<div className="Container">
			<div className="content">
				<div className="login">
					<div className="loginContainer">
						<Button
							icon={<CaretLeftOutlined />}
							onClick={() => {
								setRegisterClicked(false);
							}}
						/>

						<label>First Name</label>
						<input
							type="text"
							onChange={(e) => {
								setFirstNameReg(e.target.value);
							}}
							required
						/>
						<label>Surname</label>
						<input
							type="text"
							onChange={(e) => {
								setSurNameReg(e.target.value);
							}}
							required
						/>
						<label>Username</label>
						<input
							type="text"
							onChange={(e) => {
								setUsername(e.target.value);
							}}
							required
						/>
						<label>Password</label>
						<input
							type="password"
							onChange={(e) => {
								setPasswordReg(e.target.value);
							}}
							required
						/>
						<label>Re-Enter Password</label>
						<input
							type="password"
							onChange={(e) => {
								setPasswordTwoReg(e.target.value);
							}}
							required
						/>
						<div className="buttonContainer">
							<button onClick={registerUser}>Register</button>
							<p id="loginStatus">{registerStatus}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Register;
