import React, {Component} from 'react';
import { Collapse, Button, Well, ProgressBar, Glyphicon } from 'react-bootstrap';

class Movie extends Component {

  constructor(...args) {
    super(...args);

    this.state = {};
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

    const {original_title, vote_average, overview, poster_path} = this.props.content;

    return(
      <div>
      <div className="panel-movie panel panel-default">
        <div className="panel-heading" onClick={ ()=> this.setState({ open: !this.state.open })}>
          <h3 className="panel-title">
            {original_title}
          </h3>
          {this.renderAddRemove()}
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
            </Well>
          </div>
        </Collapse>
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


