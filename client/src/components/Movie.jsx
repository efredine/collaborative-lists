import React, {Component} from 'react';
import Video from 'react-video';
import { Collapse, Button, Well, ProgressBar, Glyphicon } from 'react-bootstrap';
import VoteStates from '../types/VoteStates';

class Movie extends Component {

  constructor(...args) {
    super(...args);
    this.state = {
      trailers: [],
      open: false,
      posterOpen: true

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

  voteClass(vote) {

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
          <Glyphicon onClick={ ()=> this.setState({ open: !this.state.open })} glyph="glyphicon glyphicon-chevron-right"/>
        </div>
      );
    }
  }

  renderAddRemove() {
    const { completed } = this.props;
    if (completed === false) {
      return (
          <div className="remove">
            <img className= "image" onClick={this.onRemove} src="http://localhost:8080/images/remove.png"/>
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
    return(<img className= "image" src={"http://image.tmdb.org/t/p/w500/" + backdrop_path}/>);
  };

  portraitFormat = () => {
    const {poster_path, overview, vote_average} = this.props.content;
    return(
      <div>
        <dl className="dl-horizontal">
          <dt>
            <img className="poster-image" src={"http://image.tmdb.org/t/p/w185/" + poster_path}/>
          </dt>
          <dd>
            {overview}
          </dd>
        </dl>
        <div className="review-bar-container">
          <ProgressBar bsStyle="danger" active now={vote_average * 10} label={`${vote_average} / 10 Average Rating`}/>
        </div>
      </div>
    );
  };

  landscapeCollapsed = () => {
    const {overview, vote_average} = this.props.content;
    return(
      <div>
        <div>
          {this.trailerLink()}
          <p>{overview}</p>
        </div>
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
