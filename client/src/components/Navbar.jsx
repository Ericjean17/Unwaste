import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Navbar.css";
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';

const Navbar = () => {
	const [menuOpen, setMenuOpen] = useState(false);
	const toggleMenu = () => setMenuOpen(!menuOpen);
	const navigate = useNavigate();
	
	const userId = localStorage.getItem("userId");

	const handleRecipesClick = e => {
		const preferencesSet = localStorage.getItem("setUserPreferences") === "true";

		if (!preferencesSet) {
			e.preventDefault();
			alert("Please set your dietary preferences first in the profiles page");
			navigate(`/users/${userId}/diet`);
		}
	}

	return (
		<header id="navbar">
			<div className="navbar-container primary-header text-font">
				<a href="/recipes" className='fs-500 text-neutral-900 fw-bold'>Unwaste</a>
				<nav>
					<ul className={`nav-items ${menuOpen ? "open" : ""}`}>
						<li>
							<a href={`/users/${userId}/recipes`} className="text-accent-100 text-font fw-bold" onClick={handleRecipesClick}>Recipes</a>
						</li>
						<li><a href={`/users/${userId}/ingredients`} className="text-accent-100 text-font fw-bold">Ingredients</a></li>
						<li><a href={`/users/${userId}/diet`} className="text-accent-100 text-font fw-bold">Profile</a></li>
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