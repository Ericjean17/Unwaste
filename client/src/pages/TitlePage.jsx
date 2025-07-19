import React from 'react';
import "../css/TitlePage.css";
import Header from "../components/Header";

function TitlePage() {
	return (
		<div className='home-page'>
			<Header /> 
			<main>
				<section>
					<div className='container text-font'>
						<h1 className='fs-primary-heading fw-bold'>Ingredients in. Recipes out.</h1>
						<p className='description'>Reduce food waste and discover tasty recipes using only the ingredients you already own</p>
						<button className="btn-3 bg-primary-400 text-accent-400 fw-bold"><a href="/register">Get Started</a></button>
					</div>
				</section>
			</main>
		</div>
	);
}

export default TitlePage;
