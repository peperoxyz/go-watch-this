// themoviedb APi
const apiKey = "9549cdff5442fe2fb98f36d4cad6ae63";
const apiUrl = `https://api.themoviedb.org/3/trending/all/week?api_key=${apiKey}`;

// global variables
let selectedCardImage = "";
let userReview = {};

// element selector
const movieListContainerEl = document.getElementById("movie-list-container");
const bentoPosterContainerEl = document.getElementById("bento-item poster");
const moviePosterImageEl = document.getElementById("movie-poster");

// bento item selector
const bentoValue1El = document.getElementById("bento-value-1");
const bentoValue2El = document.getElementById("bento-value-2");
const bentoValue3El = document.getElementById("bento-value-3");
const bentoValue4El = document.getElementById("bento-value-4");
const bentoValue5El = document.getElementById("bento-value-5");

// thoughts item selector
const thoughtsQuestionEl = document.getElementById("thought-question");
const buttonSendThoughts = document.getElementById("thoughts-btn");
const thoughtsInputEl = document.getElementById("thoughts-input");

// thoughts item selector
const starsQuestionEl = document.getElementById("stars-question");
const buttonSendStars = document.getElementById("stars-btn");
const starsInputEl = document.getElementById("stars-input");

buttonSendThoughts.addEventListener("click", () => {
	let thoughtsValue = thoughtsInputEl.value;
	thoughtsQuestionEl.style.display = "none";
	bentoValue1El.innerHTML = thoughtsValue;
});

buttonSendStars.addEventListener("click", () => {
	let starsValue = starsInputEl.value;
	starsQuestionEl.style.display = "none";
	bentoValue2El.innerHTML = `${starsValue} ⭐`;
});

// function to fetchMovies
async function fetchMovies() {
	try {
		const response = await fetch(apiUrl);
		const data = await response.json();
		const movies = data.results;
		console.log(movies);
		movies.forEach((movie) => {
			if (movie.title && movie.release_date && movie.overview) {
				const movieCard = createMovieCard(movie);
				movieListContainerEl.appendChild(movieCard);
			}
		});
	} catch (error) {
		console.log("Error fetching data: ", error);
	}
}

function createMovieCard(movie) {
	const { title, name, poster_path } = movie;
	const movieCard = document.createElement("div");
	movieCard.classList.add("movie-card-item");

	movieCard.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w500/${poster_path}" class="rounded-lg w-2 /">
        
    `;

	movieCard.addEventListener("click", () => {
		const warningContainerEl = document.getElementById("warning-container");
		warningContainerEl.style.display = "none";
		selectedCardImage = movieCard.children[0].attributes[0].value;
		moviePosterImageEl.src = selectedCardImage;
		bentoPosterContainerEl.append(moviePosterImageEl);
		userReview = {
			title: movie.title,
			overview: movie.overview,
			released_year: movie.release_date.slice(0, 4),
			vote_average: movie.vote_average,
		};
		bentoValue3El.innerHTML = `${userReview.vote_average}/10`;
		bentoValue4El.innerHTML = userReview.overview;
		bentoValue5El.innerHTML = `${userReview.title} (${userReview.released_year})`;
	});

	return movieCard;
}

fetchMovies();
