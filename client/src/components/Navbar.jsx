import { useState } from "react";
import "../css/Navbar.css";
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';

const Navbar = () => {
	const [menuOpen, setMenuOpen] = useState(false);
	const toggleMenu = () => setMenuOpen(!menuOpen);
	
	const userId = localStorage.getItem("userId");
	return (
		<header id="navbar">
			<div className="navbar-container primary-header text-font">
				<a href="/recipes" className='fs-500 text-neutral-900 fw-bold'>Unwaste</a>
				<nav>
					<ul className={`nav-items ${menuOpen ? "open" : ""}`}>
						<li><a href="/recipes" className="text-accent-100 text-font fw-bold">Recipes</a></li>
						<li><a href="/home" className="text-accent-100 text-font fw-bold">Ingredients</a></li>
						<li><a href={`/users/${userId}/profile`} className="text-accent-100 text-font fw-bold">Profile</a></li>
						<button className="text-accent-100 text-font fw-bold">Logout</button>
					</ul>
				</nav>
				{/* Hamburger icon */}
				<button className={`hamburger ${menuOpen ? "open" : ""}`} onClick={toggleMenu}>
					<span />
					<span />
					<span />
				</button>
			</div>
		</header>
	)
}

export default Navbar;