import React, {Component} from 'react';
import Movie from '../components/Movie.jsx'
import fetch from 'isomorphic-fetch';
import _ from 'lodash'

class MovieContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfMovies: 0,
      movies: [],
      selected: []
    };
  }

  componentDidMount() {

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
  this.setState({
    selected: updatedSelectedArray
  })
}

  render() {
    // this iterates through the movies object and returns the movie title and rating
    var movies = _.map(this.state.movies, (movie, index)=> {
      return  <Movie key={movie.id} index={index} onAdd={this.clickMovie} title={movie.original_title} rating={movie.vote_average} />

    });

    var options = _.map(this.state.movies, (movie)=> {
      return <option key = {movie.id}>{movie.original_title} value = {movie.id} </option>
    });

    const selected = _.map(this.state.selected, (movie)=> {
      return <Movie key = {movie.id} title={movie.original_title} rating={movie.vote_average} />
    });

    return (
      <div>
        <div>
          {selected}
        </div>
        <div>
          <input ref = "query" onChange =  {(e) => {this.updateSearch();}} type = 'text'/>
          <select ref = "movieSelector" onChange = {() => {this.selectMovie()}}>{options}</select>
          {movies}
        </div>
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
        numberOfMovies: movies.results.length,
        movies: movies.results,
      });
      console.log(movies.results)
    })
  }
}
export default MovieContainer;
