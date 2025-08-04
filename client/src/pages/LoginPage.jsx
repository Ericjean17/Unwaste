import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/RegisterPage.css";
import Header from "../components/Header";
import Input from "../components/Input";

export default function LoginPage() {
	// Form consists of anobject with a username & password
	const [form, setForm] = useState({
		username: "", 
		password: ""
	});
	const navigate = useNavigate();
	
	const handleLogin = async e => {
		e.preventDefault(); // stop user from submitting the form

		// Sends a POST request, if successful, creates a token for the user and goes to their ingredient page
		try {
			const response = await fetch("http://localhost:3000/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(form) // converts form data into json and puts it into req.body in backend
			})
			const data = await response.json(); // converts json back into js object

			if (response.ok) {
				localStorage.setItem("userId", data.userId); // save user id in localStorage
				localStorage.setItem("token", data.token); // JWT is saved in browser across page refreshes, allows them to access their ingredient page
				alert("Login successful");
				navigate(`/users/${data.userId}/ingredients`);
			} else {
				alert(data.message);
			}
		} catch (err) {
			console.error(err.message);
		}
	}

	// Tracks user input, e.target.name and e.target.value relates to form key:value.
	// Updates the useState by getting all previous values through callback and spread operator 
	// and overwriting new value with [name]: value. (e.g., username: newvalue)
	const handleChange = (e) => {
		const {name, value} = e.target;
		setForm(prevForm => ({
			...prevForm, [name]: value
		}));
	}

	useEffect(() => {
		const userId = localStorage.getItem("userId");
		const token = localStorage.getItem("token");

		if (userId && token) {
			alert("You are already logged in");
			navigate(`/users/${userId}/ingredients`);
		}
	}, [])

	return (
		<section className="register-page">
			<Header />
			<div className="register-container text-font">
				<form className="form" onSubmit={handleLogin}>
					<div className="info">
						<h2>Login</h2>
						<div className="user-info">
							<div>
								<Input 
									label="Username" 
									name="username" 
									type="text" 
									id="username"
									value={form.username}
									onChange={handleChange}
								/>
							</div>
							<div>
								<Input 
									label="Password" 
									name="password" 
									type="password" 
									id="password"
									value={form.password}
									onChange={handleChange}
								/>
							</div>
						</div>
					</div>
					<div className="register-button">
						<button className="bg-primary-400 text-accent-400 fw-bold" type="submit">
							{/* <a href="/home">Sign Up</a> */}
							Login
						</button>
					</div>
				</form>
			</div>
		</section>
	)
};