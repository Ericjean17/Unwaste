import { useState } from "react";
import "./Header.css";

const Header = () => {
	const [showMenuIcon, setShowMenuIcon] = useState(false);
	const toggleMenu = () => {
		setShowMenuIcon(!setShowMenuIcon);
	}

	return (
		<header className='primary-header text-font'>
			<div className="header-container">
			{/* <nav className='primary-navigation'>
					<div className="auth-buttons">
							<button className="signup-btn">Login</button>
							<button className="signin-btn">Register</button>
					</div>
			</nav> */}
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
			{/* <button>{showMenuIcon && <MenuIcon className="menu-icon" />}</button> */}
			</div>
		</header>
	) 
};

export default Header;