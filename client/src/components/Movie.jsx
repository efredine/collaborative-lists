import React, {Component} from 'react';

class Movie extends Component {

  render() {
    const {title, rating} = this.props;

    return(
      <div className="panel-movie panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">
            <img className="certified" src="http://localhost:8080/images/certified.png"/>
            {rating * 10}% {title}
          </h3>
          <div className="add">
            <img src="http://localhost:8080/images/add.png"/>
          </div>
        </div>
        <div className="panel-body">
          Rating: PG-13 | Genre: Action &amp; Adventure  | Runtime: 133 minutes  | Directed By: Gareth Edwards
        </div>
      </div>
  );
  }
}
export default Movie;
