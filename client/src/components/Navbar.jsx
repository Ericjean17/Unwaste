import { useState } from "react";
import "../css/Navbar.css";
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';

const Navbar = () => {
	const [menuOpen, setMenuOpen] = useState(false);
	const toggleMenu = () => setMenuOpen(!menuOpen);
	
	return (
		<header id="navbar">
			<div className="navbar-container primary-header text-font">
				{/* <div> */}
				<a href="/recipes" className='fs-500 text-neutral-900 fw-bold'>Unwaste</a>
				{/* </div> */}
				<nav>
					<ul className={`nav-items ${menuOpen ? "open" : ""}`}>
						<li><a href="/recipes" className="text-accent-100 text-font fw-bold">Recipes</a></li>
						<li><a href="/home" className="text-accent-100 text-font fw-bold">Ingredients</a></li>
						<li><a href="/profile" className="text-accent-100 text-font fw-bold">Profile</a></li>
						<button className="text-accent-100 text-font fw-bold">Logout</button>
					</ul>
				</nav>
				{/* Hamburger icon */}
				<button className="hamburger" onClick={toggleMenu}>
					<span />
					<span />
					<span />
				</button>
			</div>
		</header>
	)
}

export default Navbar;