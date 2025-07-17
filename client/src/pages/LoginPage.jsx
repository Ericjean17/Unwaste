import React, { useState } from "react";
import "./RegisterPage.css";
import Header from "../components/Header";
import Input from "../components/Input";

export default function LoginPage() {
		const [form, setForm] = useState({
			username: "", 
			password: ""
		});
		
		const handleLogin = async e => {
			e.preventDefault();
			const response = await fetch("http://localhost:3000/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(form)
			})

			const data = await response.json();

			if (response.ok) {
				//alert("Login successful");
				alert(data.message);
				window.location.href = "/home"
				// redirect or store session/token
			} else {
				alert("Incorrect username or password");
			}
		}

		const handleChange = (e) => {
			const {name, value} = e.target;
			setForm(prevForm => ({
				...prevForm, [name]: value
			}));
		}

    return (
			<section className="register-page">
				<Header />
				<div className="register-container text-font">
					<form onSubmit={handleLogin}>
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