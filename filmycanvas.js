const resultDiv = document.querySelector('#resultDiv');
const movieName = document.querySelector('#movieName');
const imageElement = document.querySelector('img');

/*to trigger the 'Enter key' search*/
var input = document.getElementById("movieName");
input.addEventListener("keyup", function (apiCall) {
	if (event.keyCode === 13) {
		event.preventDefault();
		document.getElementById("search").click();
	}
});

/*This is the main function called after clicking the search button*/
function apiCall() {
	var movie = document.getElementById("movieName").value;
	var result = "";
	var title = "";

	/*user input is added to the API url and the response is saved to a constant 'mydata'*/
    fetch("https://www.omdbapi.com/?s=" + movie + "&apikey=39201518")
    .then((response)=>response.json())
    .then((mydata) => {
      	const movies = mydata.Search;
      	console.log(mydata);
        searchMovie(movies);
        movieName.value = ''; }	)

}
function searchMovie(movies) {
	resultDiv.innerHTML = '';
	const movieBlock = createResultDiv(movies);
	resultDiv.appendChild(movieBlock);
}

function createResultDiv(movies) {
	const movieElement = document.createElement('div');
	movieElement.setAttribute('class', 'movie');
	const resultTemplate = `
							<section class="section">
								${movies.map((movie) => {
		if (movie.Poster) {
			return `<div class="clearfix">
									<img class="r_img" src=${movie.Poster}
									movieID=${movie.imdbID}>
										<div class="r-details">
											<h2 class="r_title">${movie.Title}</h2>
											<h3 class="r_year"><span class="key">Year: </span> ${movie.Year}</h3>
											<h3 class="r_type"><span class="key">Type: </span> ${movie.Type}</h3>
										</div>
									</div>
									`;
		}

	})}`;

	movieElement.innerHTML = resultTemplate;
	return movieElement;
}

async function movieInfo(id) {
    fetch("https://www.omdbapi.com/?i=" + id + "&apikey=39201518")
    .then(response => response.json())
    .then((moviedata) => {
      displayInfo(moviedata);      
    });
}

function displayInfo(movieData) {
	resultDiv.innerHTML = `
					<div class="clearfix" id="info_container">
							<img id="movie_img" src="${movieData.Poster}" height="400" width="300"/>						
						<div id="basic_info">
							<p><span class="key">Title: </span>${movieData.Title}</p>
							<p><span class="key">Year: </span>${movieData.Year}</p>
							<p><span class="key">Rated: </span>${movieData.Rated}</p>
							<p><span class="key">Released: </span>${movieData.Released}</p>
							<p><span class="key">Runtime: </span>${movieData.Runtime}</p>
							<p><span class="key">Genre: </span>${movieData.Genre}</p>
							<p><span class="key">Director: </span>${movieData.Director}</p>
							<p><span class="key">Writer: </span>${movieData.Writer}</p>
							<p><span class="key">Actors: </span>${movieData.Actors}</p>
							<p><span class="key">Language: </span>${movieData.Language}</p>
							<p><span class="key">Country: </span>${movieData.Country}</p>
							<p><span class="key">Awards: </span>${movieData.Awards}</p>
							<p><span class="key">Metascore: </span>${movieData.Metascore}</p>
							<p><span class="key">IMDB Rating: </span>${movieData.imdbRating}</p>
							<p><span class="key">IMDB Votes: </span>${movieData.imdbVotes}</p>
							<p><span class="key">IMDB ID: </span>${movieData.imdbID}</p>
						</div>
						<div id="movie_plot">
							<p><span class="key">Plot: </span>${movieData.Plot}</p>
						</div>
					</div>`;
}


document.onclick = function (event) {
	const target = event.target;
	if (target.tagName.toLowerCase() == 'img') {
		const movieID = target.attributes.movieid.nodeValue;
		console.log(movieID);
		movieInfo(movieID);
	}
	if (target.className == 'r-details') {
		const myimg = target.parentElement.firstChild.nextSibling;
		const movieID = myimg.attributes.movieid.nodeValue;
		console.log(movieID);
		movieInfo(movieID);
	}
}

