$(document).ready(() => {
  // create event for when form is submitted
  $("#searchForm").on("submit", e => {
    let searchText = $("#searchText").val();
    // new function taking in the new search text
    getMovies(searchText);
    e.preventDefault();
  });
});

function getMovies(searchText) {
  // make request to api
  axios
    .get(
      "https://api.themoviedb.org/3/search/movie?api_key=7a390d96a98bf8c0b6ce05000a4e1c5d&query=" +
        searchText
    )
    .then(response => {
      console.log(response);
      let movies = response.data.results;
      let output = "";
      $.each(movies, (index, movie) => {
        output += `
          <div class="col-md-3">
          <div class="card text-white bg-primary mb-3 text-center" style="max-width: 20rem;">
          <div class="card-header">${movie.title}</div>
          <div class="card-body">
          <img src="https://image.tmdb.org/t/p/w500${
            movie.poster_path
          }" class="posterImage">
          <a onclick="movieSelected('${
            movie.id
          }')" class="btn btn-primary" href="#">Movie Details</a>
          </div>
        </div>
          </div> 
          `;
      });
      $("#movies").html(output);
    })
    .catch(err => {
      console.log(err);
    });
}

function movieSelected(id) {
  sessionStorage.setItem("movieId", id);
  window.location = "movie.html";
  return false;
}

function getMovie() {
  let movieId = sessionStorage.getItem("movieId");

  axios
    .get(
      "https://api.themoviedb.org/3/movie/" +
        movieId +
        "?api_key=7a390d96a98bf8c0b6ce05000a4e1c5d"
    )
    .then(response => {
      console.log(response);
      let movie = response.data;

      let output = `
      <div class="row">
        <div class="col-md-4">
          <img src="https://image.tmdb.org/t/p/w500${
            movie.poster_path
          }" class="thumbnail">
        </div>
        <div class="col-md-8">
          <h2>${movie.title}</h2>
          <ul class="list-group">
          <li class="list-group-item"><strong>${movie.tagline}</strong></li>
          <li class="list-group-item"><strong>Runtime: </strong>${
            movie.runtime
          } mins</li>
          <li class="list-group-item"><strong>Released: </strong>${
            movie.release_date
          }</li>
          <li class="list-group-item"><strong>Score: </strong>${
            movie.vote_average
          }</li>
          <li class="list-group-item"><strong>Budget: $</strong>${
            movie.budget
          }</li>
          <li class="list-group-item"><strong>Revenue: $</strong>${
            movie.revenue
          }</li>
          </ul>
        </div>
      </div>
      <div class="row">
          <div class="well overview">
            <h3>Overview</h3>
            <p>${movie.overview}</p>
            <hr/>
            <a href="https://imdb.com/title/${
              movie.imdb_id
            }" target="_blank" class="btn btn-info">View on iMDB</a>
            <a href="index.html" class="btn btn-primary">Back to Search</a>
          </div>
      </div>
      `;
      $("#movie").html(output);
    })
    .catch(err => {
      console.log(err);
    });
}
