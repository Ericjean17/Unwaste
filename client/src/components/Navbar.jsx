import "../css/Navbar.css";

const Navbar = () => {
    return (
			<header id="navbar">
				<div className="navbar-container primary-header text-font">
					<div>
						<span><a href="/recipes" className='fs-500 text-neutral-900 fw-bold'>Unwaste</a></span>
					</div>
					<nav>
						<ul className="nav-items ">
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