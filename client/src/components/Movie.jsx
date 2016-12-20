import React, {Component} from 'react';
import { Collapse, Button, Well, ProgressBar } from 'react-bootstrap';

class Movie extends Component {

constructor(...args) {
    super(...args);

    this.state = {};
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
    const {title, rating, summary, poster} = this.props;


    return(
      <div>
      <div className="panel-movie panel panel-default">
        <div className="panel-heading" onClick={ ()=> this.setState({ open: !this.state.open })}>
          <div className="remove">
            <img onClick={this.onRemove} src="http://localhost:8080/images/remove.png"/>
          </div>
          <h3 className="panel-title">
            {title}
          </h3>
        <Collapse in={this.state.open}>
          <div>
            <Well>
            <div className="poster">
              <img src={"http://image.tmdb.org/t/p/w185/" + poster}/>
            </div>
              <p>{summary}</p>
              <div>
               <ProgressBar bsStyle="danger" active now={rating * 10} label={`${rating} / 10 Average Rating`}/>
              </div>
            </Well>
          </div>
        </Collapse>
          <div className="add">
            <img onClick={this.onAdd} src="http://localhost:8080/images/add.png"/>
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


