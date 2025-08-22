import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/RegisterPage.css";
import Header from "../components/Header";
import Input from "../components/Input";

export default function RegisterPage() {
		const [form, setForm] = useState({
			username: "", 
			password: ""
		});
		const navigate = useNavigate();
		
		const handleSubmit = async e => {
			e.preventDefault();
			if (form.username === "" || form.password === "") {
				alert("Missing username or password");
				return;
			}

			try {
				const response = await fetch(`${import.meta.env.VITE_BACKEND_BASEURL}/register`, {
					method: "POST",
					headers: { "Content-Type": "application/json"},
					body: JSON.stringify(form)
				})
				
				const data = await response.json(); 

				if (response.ok) {
					// console.log("User registered", data);
					// alert(`Welcome: ${data.username} with id: ${data.id}`);
					navigate(`/login`);
				} else {
					alert(`Registration failed: ${data.message}`);
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
					<form className="form" onSubmit={handleSubmit}>
						<div className="info">
							<h2>Sign Up</h2>
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
							<button className="fw-bold" type="submit">
								Sign Up
							</button>
						</div>
					</form>
				</div>
			</section>
    )
};