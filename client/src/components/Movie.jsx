import React, {Component} from 'react';
import { Collapse, Button, Well, ProgressBar } from 'react-bootstrap';
import Video from 'react-video';


class Movie extends Component {

constructor(...args) {
    super(...args);

    this.state = {
      trailers: [],
      key: undefined
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
             key: this.props.movieTrailerKey
           });
        })
  }

  onAdd = () => {
    const {onAdd, index} = this.props;
    onAdd(index);
  }

  onRemove = () => {
    const {onRemove, index} = this.props;
    onRemove(index);
  }

  render() {




    const {original_title, vote_average, overview, poster_path} = this.props.content;

    var movieTrailerKey = _.map(this.state.trailers, (trailerKey)=> {
        return trailerKey.key
    })

    return(
      <div>
      <div className="panel-movie panel panel-default">
        <div className="panel-heading" onClick={ ()=> this.setState({ open: !this.state.open })}>
          <div className="remove">
            <img onClick={this.onRemove} src="http://localhost:8080/images/remove.png"/>
          </div>
          <h3 className="panel-title">
            {original_title}
          </h3>
        <Collapse in={this.state.open}>
          <div>
            <Well>
            <div className="poster">
              <img src={"http://image.tmdb.org/t/p/w185/" + poster_path}/>
            </div>
              <p>{overview}</p>
              <div>
               <ProgressBar bsStyle="danger" active now={vote_average * 10} label={`${vote_average} / 10 Average Rating`}/>
              </div>
              <iframe
                src={`https://www.youtube.com/embed/${movieTrailerKey[0]}`}
                allowFullScreen
                />
            </Well>
          </div>
        </Collapse>
          <div className="add">
            <img onClick={this.onAdd} src="http://localhost:8080/images/add.png"/>
          </div>
          <div>
            <div >
        </div>
            {/* <video title="Video" controls>
              <source type="video/mp4" src={'https://www.youtube.com/watch?v='+ individualTrailerLink[0]}/>
            </video> */}

          </div>
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
