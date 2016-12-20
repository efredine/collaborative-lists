import React, {Component} from 'react';
import fetch from 'isomorphic-fetch';
import _ from 'lodash';
import { Link } from 'react-router'


class Lists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: this.lists
    };
  }

  componentDidMount() {
    fetch('/api/lists', {credentials: 'include'})
    .then(response => {
      return response.json();
    })
    .then(lists => {
      console.log('lists',lists);
      this.setState({lists: lists});
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
    var listArray = _.map(this.state.lists, (list) => {
      return <li key = {list.id}><Link to={'/'+ list.id}>{list.title}</Link></li>
    });
    return (
      <div>
          <button  onClick={this.newList} className="btn btn-default">Add</button>
          <h1>{listArray}</h1>
      </div>
    );
  }


}
export default Lists;
