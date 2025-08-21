import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../css/Navbar.css";

const Navbar = () => {
	const [menuOpen, setMenuOpen] = useState(false);
	const navigate = useNavigate();
	const userId = localStorage.getItem("userId");

	const toggleMenu = () => {
		setMenuOpen(!menuOpen);
	};

	const handleOverlayClick = (e) => {
		if (e.target === e.currentTarget) {
			setMenuOpen(false);
		}
	};

	// To logout a user, remove their token and id so they cannot access any authorized routes
	const handleLogout = () => {
		localStorage.removeItem("userId");
		localStorage.removeItem("token");
		localStorage.removeItem("currRecipes");
		navigate("../login");
	}

	useEffect(() => {
		if (menuOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'unset';
		}

		return () => {
			document.body.style.overflow = 'unset';
		}
	}, [menuOpen])

	return (
		<header id="navbar">
			{/* Overlay */}
			{menuOpen && (
				<div
					className="navbar-overlay"
					onClick={handleOverlayClick}
				/>
			)}

			<div className="navbar-container">
				<h1 className='app-name'>Unwaste</h1>
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