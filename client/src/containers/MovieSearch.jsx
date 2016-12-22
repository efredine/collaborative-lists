import React, {Component} from 'react';
import Movie from '../components/Movie.jsx'
import fetch from 'isomorphic-fetch';
import _ from 'lodash';
import FlipMove from 'react-flip-move';
import { connect } from 'react-redux'
import { addMovie} from '../actions';

class MovieSearch extends Component {
  constructor(props) {
    super(props);
    this.onSumbit=this.onSumbit.bind(this);
    this.state = {
      movies: []
    };
  }

  componentDidMount() {
    this.search('/api/popular/movies');
  }

  onSumbit(e){
    if (e.charCode === 13){
      console.log("enter pressed");
      const searchUrl = `/api/movies/${this.refs.query.value}`;
      this.search(searchUrl);
    }
  }

  clickMovie = index => {
    const { addMovie } =  this.props;
    const movieSelected = this.state.movies[index];
    addMovie(movieSelected);
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

  topRated = event => {
    event.preventDefault();
    this.search('/api/popular/movies/topRated')
  }

  nowPlaying = event => {
    event.preventDefault();
    this.search('/api/popular/movies/nowPlaying');
  }

  upComing = event => {
    event.preventDefault();
    this.search('/api/popular/movies/upComing');
  }

  render() {
    var movies = _.map(this.state.movies, (movie, index)=> {
      return <Movie key={movie.id} content={movie} index={index} onAdd={this.clickMovie} votes={false}
          />
    });
    return (
      <div>

        <input ref = "query" onKeyPress =  {this.onSumbit} type = 'text'/> <br/>
        <button onClick={this.topRated}>Top Rated</button>
        <button onClick={this.nowPlaying}>Now Playing</button>
        <button onClick={this.upComing}>Up Coming</button>
        <div>
          {movies}
        </div>
      </div>
    );
  }

  search(query){
    fetch(query)
    .then(response => {
      return response.json();
    })
    .then(movies => {
      this.setState({
        movies: movies.results,
      });
    })
  }

}
const mapDispatchToProps =  ({
  addMovie: addMovie
})

export default connect(null, mapDispatchToProps)(MovieSearch);
