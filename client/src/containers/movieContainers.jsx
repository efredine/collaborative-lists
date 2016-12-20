import React, {Component} from 'react';
import Movie from '../components/Movie.jsx'
import fetch from 'isomorphic-fetch';
import _ from 'lodash'
import FlipMove from 'react-flip-move';

class MovieContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      selected: [],
      popularMovies: 0
    };
  }

  componentDidMount() {
    fetch(`http://localhost:8080/api/popular/movies`)
    .then(response => {
      return response.text();
    })
    .then(responseText => {
      const popularMovies = JSON.parse(responseText);
      console.log("pupular movies", popularMovies);
       this.setState({
         movies: popularMovies.results
       });
    })

  }
// updates what ever movie name you put in the search box with the results starting with its name
updateSearch(){
  this.search(this.refs.query.value);
  console.log(this.search(this.refs.query.value))

}

selectMovie(){
  console.log(this.refs.movieSelector.value)
}

clickMovie = index => {
  const movieSelected = this.state.movies[index];
  console.log(movieSelected);
  // create a copy of the selected array
  const updatedSelectedArray = this.state.selected.slice();
  updatedSelectedArray.push(movieSelected);
  const updatedMovies = this.state.movies.slice();
  updatedMovies.splice(index, 1);
  this.setState({
    selected: updatedSelectedArray,
    movies: updatedMovies
  })
}

removeMovie = index => {
  const toRemove = this.state.selected[index];
  const updatedSelectedArray = this.state.selected.slice();
  updatedSelectedArray.splice(index,1);
  this.setState({
    selected: updatedSelectedArray,
  })
}

  render() {

    // var currentPopularMovies = _.map(this.state.popularMovies, (movie, index)=> {
    //   return <Movie key ={movie.id} index={index} onAdd={this.clickMovie} title={movie.original_title} rating={movie.vote_average} />
    // });

    // this iterates through the movies object and returns the movie title and rating
    var movies = _.map(this.state.movies, (movie, index)=> {
      return <Movie key={movie.id} index={index} onAdd={this.clickMovie}
      poster = {movie.poster_path} summery = {movie.overview}
      title={movie.original_title} rating={movie.vote_average}
          />

    });

    // var options = _.map(this.state.movies, (movie)=> {
    //   return <option key = {movie.id}>{movie.original_title} value = {movie.id} </option>
    // });

    const selected = _.map(this.state.selected, (movie, index)=> {
      return <Movie key = {movie.id} title={movie.original_title} index={index} onRemove={this.removeMovie} rating={movie.vote_average} />
    });

    return (
      <div>
        <div className="newPanel">
        <FlipMove easing="cubic-bezier(0, 0.7, 0.8, 0.1)">
          {selected}
        </FlipMove>
        </div>
        <input ref = "query" onChange =  {(e) => {this.updateSearch();}} type = 'text'/>
        <FlipMove easing="cubic-bezier(0, 0.7, 0.8, 0.1)">
          {movies}
        </FlipMove>
      </div>
    );
  }

  search(query){
    fetch(`http://localhost:8080/api/movies/${query}`)
    .then(response => {
      return response.text();
    })
    .then(responseText => {
      const movies = JSON.parse(responseText);
      console.log(movies);
      this.setState({
        movies: movies.results,
      });
      console.log(movies.results)
    })
  }


}
export default MovieContainer;
