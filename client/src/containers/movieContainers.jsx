import React, {Component} from 'react';
import '../components/Movie.jsx'
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
    var movies = _.map(this.state.movies, (movie, key)=> {
      return <li>{movie.original_title}</li>
    });

    return (
      <div>
        <input ref = "query" onChange =  { (e) => {this.updateSearch();}} type = 'text'/>
        <h1>Number of movies: {this.state.numberOfMovies}</h1>
        <ul>{movies}</ul>
      </div>
    );
  }
  search(query = "star"){
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
