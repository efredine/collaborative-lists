import React, {Component} from 'react';
import Movie from '../components/Movie.jsx'
import fetch from 'isomorphic-fetch';
import _ from 'lodash'
import FlipMove from 'react-flip-move';
import { connect } from 'react-redux'
import { addMovie} from '../actions'

class MovieSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
    };
  }

  componentDidMount() {
    fetch(`http://localhost:8080/api/popular/movies`)
    .then(response => {
      return response.text();
    })
    .then(responseText => {
      const popularMovies = JSON.parse(responseText);
      console.log("popular movies", popularMovies);
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
    const { addMovie } =  this.props;
    const movieSelected = this.state.movies[index];
    addMovie(movieSelected);
    console.log(movieSelected);

    const updatedMovies = this.state.movies.slice();
    updatedMovies.splice(index, 1);
    this.setState({
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


    // this iterates through the movies object and returns the movie title and rating
    var movies = _.map(this.state.movies, (movie, index)=> {
      return <Movie key={movie.id} content={movie} index={index} onAdd={this.clickMovie}
          />
    });

    return (
      <div>
        <input ref = "query" onChange =  {(e) => {this.updateSearch();}} type = 'text'/>
        <div>
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
        movies: movies.results,
      });
      console.log(movies.results)
    })
  }
}
const mapDispatchToProps =  ({
  addMovie: addMovie
})

export default connect(null, mapDispatchToProps)(MovieSearch);