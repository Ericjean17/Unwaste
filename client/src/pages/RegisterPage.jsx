import React, { useState } from "react";
import "./RegisterPage.css";
import Header from "../components/Header";
import Input from "../components/Input";

export default function RegisterPage() {
		const [form, setForm] = useState({
			username: "", 
			password: ""
		});
		
		const handleSubmit = async e => {
			e.preventDefault();
			try {
				const response = await fetch("http://localhost:3000/register", {
					method: "POST",
					headers: { "Content-Type": "application/json"},
					body: JSON.stringify(form) // converts form data into json and puts it into req.bodyd
				})
				
				const data = await response.json(); // converts json back into js object

				if (response.ok) {
					console.log("User registered", data);
					window.location.href = "/home";
				} else {
					console.error("Registration failed", data.message);
				}
			} catch (err) {
				console.error(err.message);
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
					<form onSubmit={handleSubmit}>
						<div className="info">
							<h2>Sign Up</h2>
							{/* <div className="person-info">
								<div className="two-columns">
									<Input 
										label="First Name" 
										name="firstName" 
										type="text" 
										id="firstName"
										value={form.firstName}
										onChange={handleChange}
									/>
									<Input 
										label="Last Name" 
										name="lastName" 
										type="text" 
										id="lastName"
										value={form.lastName}
										onChange={handleChange}
									/>
								</div>
							</div> */}
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
								Sign Up
							</button>
						</div>
					</form>
				</div>
			</section>
    )
};