import { useState } from "react";
import "./Header.css";

const Header = () => {
	const toggleMenu = () => {
		setShowMenuIcon(!setShowMenuIcon);
	}

	return (
		<header className='primary-header text-font'>
			<div className="header-container">
				<div>
					<a href="/">
						<span className='fs-500 text-neutral-900 fw-bold'>Unwaste</span>
					</a>
				</div>
				<div className="btns-auth">
					<button className="btn-log-in text-font fw-bold">
						<a href="/login">Log In</a>
					</button>
					<button className="btn-sign-in bg-primary-400 text-accent-400 text-font fw-bold">
						<a href="/register">Sign Up</a>
					</button>
				</div>
			</div>
		</header>
	) 
};

export default Header;