import React, {Component} from 'react';

class Movie extends Component {

  render() {
    const {title, rating} = this.props;

    return(
      div className="panel-container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title"><img className="certified" src="http://localhost:8080/images/certified.png"/>{rating}% {title}</h3>
          </div>
        <div className="panel-body">
        Rating: PG-13 | Genre: Action & Adventure  | Runtime: 133 minutes  | Directed By: Gareth Edwards
        </div>
      </div>
    );
  }
}
export default Movie;
