import React, {Component} from 'react';
import Video from 'react-video';
import { Collapse, Button, Well, ProgressBar, Glyphicon } from 'react-bootstrap';

class Movie extends Component {

  constructor(...args) {
    super(...args);
    this.state = {
      trailers: [],
      key: undefined,
      open: false

    };
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
          />
        )
      } else {
        fetch(`http://api.themoviedb.org/3/movie/${this.props.content.id}/videos?api_key=6b426deee51a1b33c8c0b4231c1543cd`)
        .then(response => {
          return response.text();
        })
        .then(responseText => {
          const movieTrailers = JSON.parse(responseText);
          console.log("trailers moviesssss", movieTrailers.results);
           this.setState({
             trailers: movieTrailers.results,
             key: this.props.movieTrailerKey,
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
            <img onClick={this.onRemove} src="http://localhost:8080/images/remove.png"/>
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
              <img onClick={this.onAdd} src="http://localhost:8080/images/add.png"/>
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

  render() {
    const {title, vote_average, overview, backdrop_path} = this.props.content;
    // if(isLoaded){
    //   return
    // }
    return(
      <div>
        <div className="panel-movie panel panel-default">
          <div className="panel-heading">
            {this.renderAddRemove()}
            <h3 className="panel-title">
              {title}
            </h3>
          </div>
          <div className="panel-body" onClick={ ()=> this.setState({ open: !this.state.open })}>
            <div className="poster">
              <img src={"http://image.tmdb.org/t/p/w500/" + backdrop_path}/>
               {this.drop()}
                <div className="voteup">
                 <Glyphicon onClick={ ()=> this.setState({ open: !this.state.open })} glyph="glyphicon glyphicon-thumbs-up"/>
                </div>
                <div className="votedown">
                 <Glyphicon onClick={ ()=> this.setState({ open: !this.state.open })} glyph="glyphicon glyphicon-thumbs-down"/>
                </div>
              <Collapse in={this.state.open}>
            <div>
              <div>
              {this.trailerLink()}
              <p>{overview}</p>
              </div>
                <div>
                 <ProgressBar bsStyle="danger" active now={vote_average * 10} label={`${vote_average} / 10 Average Rating`}/>
                </div>
              </div>
              </Collapse>
            </div>
          </div>
        </div>
      </div>
  );
  }
}
export default Movie;
