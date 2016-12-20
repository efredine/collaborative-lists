import React, {Component} from 'react';

class Movie extends Component {

  onAdd = () => {
    const {onAdd, index} = this.props;
    onAdd(index);
  }

  onRemove = () => {
    const {onRemove, index} = this.props;
    onRemove(index);
  }

  render() {
    const {title, rating} = this.props;

    return(
      <div className="panel-movie panel panel-default">
        <div className="panel-heading">
          <div className="remove">
            <img onClick={this.onRemove} src="http://localhost:8080/images/remove.png"/>
          </div>
          <h3 className="panel-title">
            {rating * 10}% {title}
          </h3>
          <div className="add">
            <img onClick={this.onAdd} src="http://localhost:8080/images/add.png"/>
          </div>
        </div>
        <div className="panel-body">
          <p> Rating: PG-13 | Genre: Action &amp; Adventure </p>
        </div>
      </div>
  );
  }
}
export default Movie;
