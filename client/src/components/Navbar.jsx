import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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

		navigate("../login");
	}

	return (
		<header id="navbar">
			<div className="navbar-container primary-header text-font">
				<a href="/recipes" className='fs-500 text-neutral-900 app-name'>Unwaste</a>
				<nav>
					<ul className={`nav-items ${menuOpen ? "open" : ""}` }>
						<li>
							<Link to={`/users/${userId}/recipes`} className="text-accent-100 text-font fw-bold">Recipes</Link>
						</li>
						<li><Link to={`/users/${userId}/ingredients`} className="text-accent-100 text-font fw-bold">Ingredients</Link></li>
						<li><Link to={`/users/${userId}/diet`} className="text-accent-100 text-font fw-bold">Diet</Link></li>
						<li>
							<Link to={`/login`} className="logout" onClick={handleLogout}>
								<span className="material-symbols-outlined">logout</span><span>Logout</span>
							</Link>
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