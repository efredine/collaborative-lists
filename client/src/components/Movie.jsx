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

  componentDidMount(){
    console.log("thisssssfdfdf", this.props.content.id)
    // http://api.themoviedb.org/3/movie/131634?api_key=###&append_to_response=videos
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

  trailerClick(){
    const movieTrailerKey = _.map(this.state.trailers, (trailerKey)=> {
        return trailerKey.key
    });
    console.log('Something was clicked')
    if (this.state.open === true){
      console.log("something else", `https://www.youtube.com/embed/${movieTrailerKey[0]}`)
      return(
      <iframe onClick={ ()=> this.setState({ open: !this.state.open })}
        src={`https://www.youtube.com/embed/${movieTrailerKey[0]}`}
        />
      )
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
    console.log("Completed:", completed);
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
          <h3 className="panel-title" onClick={ ()=> this.setState({ open: !this.state.open })}>
            {title}
          </h3>
            <Collapse in={this.state.open}>
            <div>
              <Well>
              <div className="poster">
                <img src={"http://image.tmdb.org/t/p/w500/" + backdrop_path}/>
              </div>
          <div className="add">
            <img onClick={this.onAdd} src="http://localhost:8080/images/add.png"/>
          </div>

                <p>{overview}</p>
                <div>
                 <ProgressBar bsStyle="danger" active now={vote_average * 10} label={`${vote_average} / 10 Average Rating`}/>
                </div>
              </Well>
            </div>
          </Collapse>
          {this.trailerClick()}
          {this.renderAddRemove()}
          {this.drop()}
        </div>
        <div className="panel-body">
          <p> Rating: PG-13 | Genre: Action &amp; Adventure </p>
        </div>
      </div>
      </div>

  );
  }
}
export default Movie;
