import React, {Component} from 'react';
import Movie from '../components/Movie.jsx'
import fetch from '../utils/fetch';
import _ from 'lodash';
import FlipMove from 'react-flip-move';
import { connect } from 'react-redux'
import { addMovie} from '../actions';
import { ButtonGroup, Button, FormGroup, FormControl } from 'react-bootstrap';

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

    //console.log('this.movie', this.state.movies)
    return (
      <div>
        <input ref = "query" onKeyPress = {this.onSumbit} type = 'text' placeholder="Search" />
        <ButtonGroup>
          <Button onClick={this.topRated}>Top Rated</Button>
          <Button onClick={this.nowPlaying}>Now Playing</Button>
          <Button onClick={this.upComing}>Up Coming</Button>
        </ButtonGroup>

        <FlipMove>
          {movies}
        </FlipMove>
      </div>
    );
  }

  search(query){
    this.setState({movies: []});
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
