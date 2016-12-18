import React, {Component} from 'react';
import fetch from 'isomorphic-fetch';
import _ from 'lodash'


class Lists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.names
    };
  }

  componentDidMount() {
    fetch('/api/lists', {credentials: 'include'})
    .then(response => {
      return response.json();
    })
    .then(names => {
      console.log('names',names);
      this.setState({names: names});
    })
  }

  newList = (event) => {
    console.log('clicked');
    event.preventDefault();
    fetch('/api/lists/new', {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
        body: 'title=something'
    })
    .then(response => response.json())
    .then(json => console.log('inserted', json))
    .catch(error => console.log(error));
  }


  render() {
    var list = _.map(this.state.names, (name) => {
      return <li key = {name.id}>{name.title}</li>
    });
    return (
      <div>
          <button  onClick={this.newList} className="btn btn-default">Add</button>
          <h1>{list}</h1>
      </div>
    );
  }


}
export default Lists;
