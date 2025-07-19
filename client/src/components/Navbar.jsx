import { useState } from "react";
import "../css/Navbar.css";
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
	const [menuOpen, setMenuOpen] = useState(false);
	const toggleMenu = () => setMenuOpen(!menuOpen);
	
	return (
		<header id="navbar">
			<div className="navbar-container primary-header text-font">
				<div>
					<span><a href="/recipes" className='fs-500 text-neutral-900 fw-bold'>Unwaste</a></span>
				</div>
				{/* Hamburger icon */}
				<button className="hamburger" onClick={toggleMenu}>
					<span><MenuIcon /></span>
				</button>
				<nav>
					<ul className={`nav-items ${menuOpen ? "open" : ""}`}>
						<li><a href="/recipes" className="text-accent-100 text-font fw-bold">Recipes</a></li>
						<li><a href="/home" className="text-accent-100 text-font fw-bold">Ingredients</a></li>
						<li><a href="/profile" className="text-accent-100 text-font fw-bold">Profile</a></li>
						<button className="text-accent-100 text-font fw-bold">Logout</button>
					</ul>
				</nav>
			</div>
		</header>
	)
}

export default Navbar;