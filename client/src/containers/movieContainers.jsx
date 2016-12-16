import React, {Component} from 'react';
import Movie from '../components/Movie.jsx'
import fetch from 'isomorphic-fetch';
import _ from 'lodash'

class MovieContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {numberOfMovies: 0}
  }

  componentDidMount() {

  }

updateSearch(){
  this.search(this.refs.query.value)

}

  render() {
    var movies = _.map(this.state.movies, (movie)=> {
      return <Movie key = {movie.id} title={movie.original_title} rating={movie.vote_average} />
    });

    return (
      <div>
        <input ref = "query" onChange =  { (e) => {this.updateSearch();}} type = 'text'/>
        {movies}
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
