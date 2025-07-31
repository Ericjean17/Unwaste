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

	// To logout a user, remove their token so they cannot access any authorized routes
	const handleLogout = () => {
		localStorage.removeItem("userId");
		localStorage.removeItem("token");

		navigate("http://localhost:3000/login");
	}

	return (
		<header id="navbar">
			<div className="navbar-container primary-header text-font">
				<a href="/recipes" className='fs-500 text-neutral-900 fw-bold'>Unwaste</a>
				<nav>
					<ul className={`nav-items ${menuOpen ? "open" : ""}` }>
						<li>
							<a href={`/users/${userId}/recipes`} className="text-accent-100 text-font fw-bold">Recipes</a>
						</li>
						<li><a href={`/users/${userId}/ingredients`} className="text-accent-100 text-font fw-bold">Ingredients</a></li>
						<li><a href={`/users/${userId}/diet`} className="text-accent-100 text-font fw-bold">Diet</a></li>
						<li>
							<a href={`/users/login`} className="logout" onClick={handleLogout}>
								<span class="material-symbols-outlined">logout</span><span>Logout</span>
							</a>
						</li>
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