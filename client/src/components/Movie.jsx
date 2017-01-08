import React, {Component} from 'react';
import Video from 'react-video';
import { Collapse, Button, Well, ProgressBar, Glyphicon } from 'react-bootstrap';
import VoteStates from '../types/VoteStates';
import _ from 'lodash'

class Movie extends Component {

  constructor(...args) {
    super(...args);
    this.state = {
      trailers: [],
      open: false,
      posterOpen: true,
      contents: '',
      runtime: ''
    };
  }

  castVote = (vote) => {
    const {onVote, currentVote} = this.props;
    if(currentVote === vote) {
      onVote(VoteStates.NONE)
    } else {
      onVote(vote);
    }
  }

  votingEnable () {
    // current vote will be one of the following:
    // VoteStates.NONE
    // VoteStates.UP
    // VoteStates.DOWN
    const { votes, currentVote, voteCount, numberOfVotes, thumbsUpCount, thumbsDownCount } = this.props;
    const upOn = VoteStates.UP === currentVote ? "-on" + " bounce" : "";
    const downOn = VoteStates.DOWN === currentVote ? "-off" + " bounce" : "";
    if (votes === true) {
      return (
        <div>
         <div className={"voteup" + upOn}>
          <div className ="voteupcount">
           {thumbsUpCount}
          </div>
           <Glyphicon onClick={ ()=> this.castVote(VoteStates.UP) } glyph="glyphicon glyphicon-thumbs-up"/>
         </div>
         <div className={"votedown" + downOn}>
           <div className ="votedowncount">
             {thumbsDownCount}
          </div>
           <Glyphicon onClick={ ()=> this.castVote(VoteStates.DOWN) } glyph="glyphicon glyphicon-thumbs-down"/>
         </div>
        </div>
      )
    }
    else {
      return (<div>&nbsp;</div>);
    }
  }


  trailerLink(){
    if(this.state.open === true) {
      if (this.state.trailers.length > 0){
        const movieTrailerKey = _.map(this.state.trailers, (trailerKey)=> {
          return trailerKey.key
        });
        return(
          <iframe onClick={ ()=> this.setState({ open: !this.state.open })}
          src={`https://www.youtube.com/embed/${movieTrailerKey[0]}`}
          allowFullScreen
          />
        )
      } else {
        fetch(`http://api.themoviedb.org/3/movie/${this.props.content.id}/videos?api_key=6b426deee51a1b33c8c0b4231c1543cd`)
        .then(response => {
          return response.text();
        })
        .then(responseText => {
          const movieTrailers = JSON.parse(responseText);
           this.setState({
             trailers: movieTrailers.results,
           });
        })
      }
    }
  }

  componentDidMount(){
    fetch(`https://api.themoviedb.org/3/movie/${this.props.content.id}?api_key=6b426deee51a1b33c8c0b4231c1543cd&append_to_response=credits`)
    .then(response =>{
      return response.text();
    })
    .then(responseText =>{
      const movieContents = JSON.parse(responseText);
       this.setState({contents: movieContents})
    })
  }

  genre(){
    const genreTypes = [];
    const genreIds = this.props.content.genre_ids || [];
    genreIds.forEach(function(id){
      switch(id){
        case 28:genreTypes.push(" Action ");break;
        case 12:genreTypes.push(" Adventure ");break;
        case 16:genreTypes.push(" Animation ");break;
        case 35:genreTypes.push(" Comedy ");break;
        case 80:genreTypes.push(" Crime ");break;
        case 99:genreTypes.push(" Documentary ");break;
        case 18:genreTypes.push(" Drama ");break;
        case 10751:genreTypes.push(" Family ");break;
        case 14:genreTypes.push(" Fantasy ");break;
        case 10769:genreTypes.push(" Foreign ");break;
        case 36:genreTypes.push(" History");break;
        case 27:genreTypes.push(" Horror ");break;
        case 10402:genreTypes.push(" Music ");break;
        case 9648:genreTypes.push(" Mystery ");break;
        case 10749:genreTypes.push(" Romance ");break;
        case 878:genreTypes.push(" Science Fiction ");break;
        case 10770:genreTypes.push("TV Movie ");break;
        case 53: genreTypes.push(" Thriller "); break;
        case 10752: genreTypes.push(" War "); break;
        case 37: genreTypes.push(" Western "); break;
      }
    });
    return genreTypes;
  }


  drop () {
    if (this.state.open === true) {
      return (
        <div className="drop">
          <Glyphicon onClick={ ()=> this.setState({ open: !this.state.open })} glyph="glyphicon glyphicon-chevron-down "/>
        </div>
      );
    }else {
      return (
        <div className="drop">
          <Glyphicon onClick={ ()=> this.setState({ open: !this.state.open })} glyph="glyphicon glyphicon-facetime-video"/>
        </div>
      );
    }
  }

  renderAddRemove() {
    const { completed } = this.props;
    if (completed === false) {
      return (
          <div className="remove">
            <Glyphicon onClick= {this.onClick} glyph="glyphicon glyphicon-remove"/>
          </div>
      );
    }
    if (completed === true) {
      return (
          <div className="undo">
            <Glyphicon onClick= {this.onClick} glyph="glyphicon glyphicon-repeat"/>
          </div>
      );
    }
     if (completed === undefined) {
        return (
            <div className="add">
              <img className= "image" onClick={this.onAdd} src="http://localhost:8080/images/add.png"/>
            </div>
      );
    }
  }

  onAdd = () => {
    const {onAdd, index} = this.props;
    onAdd(index);
  }

  onRemove = () => {
    const {onClick, index} = this.props;
    onClick();
  }

  onClick = () => {
    const {onClick, index} = this.props;
    onClick();
  }

  landscapeFormat = () => {
    const { backdrop_path } = this.props.content;
    if(backdrop_path) {
      return(<img className= "image" src={"http://image.tmdb.org/t/p/w500/" + backdrop_path}/>);
    }
  };

  portraitFormat = () => {
    const {poster_path, overview, vote_average} = this.props.content;
    const { contents } = this.state;
    return(
      <div>
        <dl className="dl-horizontal">
          <dt>
            <img className="poster-image" src={"http://image.tmdb.org/t/p/w185/" + poster_path}/>
          </dt>
          <dd>
            <p>{overview}</p>
            <p className="movieRuntime">{contents.runtime} Minutes</p>
            <p className="genre">{this.genre()}</p>
            <div className="review-bar-container">
              <ProgressBar bsStyle="danger" active now={vote_average * 10} label={`${vote_average} / 10 Average Rating`}/>
            </div>
          </dd>
        </dl>
      </div>
    );
  };

  getActors = () => {
    const { contents } = this.state;
    if(contents && contents.credits && contents.credits.cast) {
      const cast = contents.credits.cast;
      return cast.slice(0, 10).map( (actor, index) =>
        (actor.profile_path && <img key={index} className= "actors" src = {"http://image.tmdb.org/t/p/w500"+ actor.profile_path} />)
      );
    }
  }

  landscapeCollapsed = () => {
    const {overview, vote_average} = this.props.content;
    return(
      <div>
        <div>
          {this.trailerLink()}
          <p>{overview}</p>
        </div>
        <div>{this.getActors()}</div>
        <div>
          <ProgressBar bsStyle="danger" active now={vote_average * 10} label={`${vote_average} / 10 Average Rating`}/>
        </div>
      </div>
      );
  }

  portraitCollapsed = () => {
   return(
      <div>
        <div>
          {this.trailerLink()}
        </div>
      </div>
      );
  }

  render() {

    const { portrait } = this.props;
    const {title, vote_average, overview, backdrop_path} = this.props.content;
    return(
      <div>
        <div className="panel-movie panel panel-default">
          <div className="panel-heading" onClick={ ()=> this.setState({ posterOpen: !this.state.posterOpen })}>
            {this.renderAddRemove()}
            <h3 className="panel-title">
              {title}
            </h3>
          </div>
          <div className="panel-body">
            <div className="poster">
              <Collapse in={this.state.posterOpen}>
                {portrait ? this.portraitFormat() : this.landscapeFormat()}
              </Collapse>
              {this.drop()}
              {this.votingEnable()}
              <Collapse in={this.state.open}>
                {portrait ? this.portraitCollapsed() : this.landscapeCollapsed()}
              </Collapse>
            </div>
          </div>
      </div>
    </div>
  );
  }
}
export default Movie;