import { NavLink } from "react-router-dom";

import "../css/Header.css";

const Header = () => {
	return (
		<header id='header' className='primary-header'>
			<div className="header-container">
				<div>
					<NavLink to="/">
						<span className='fs-500 text-neutral-900 fw-bold'>Unwaste</span>
					</NavLink>
				</div>
				<div className="btns-auth">
					<button className="btn-log-in text-font fw-bold">
						<NavLink to="/login">Log In</NavLink>
					</button>
					<button className="btn-sign-in bg-primary-400 text-accent-400 text-font fw-bold">
						<NavLink to="/register">Sign Up</NavLink>
					</button>
				</div>
			</div>
		</header>
	) 
};

export default Header;