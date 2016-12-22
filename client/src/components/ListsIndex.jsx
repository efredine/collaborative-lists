import React, {Component} from 'react';
import fetch from 'isomorphic-fetch';
import _ from 'lodash';
import { Link } from 'react-router'


class ListsIndex extends Component {
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
        body: 'title=untitled'
    })
    .then(response => response.json())
    .then(result => {
      console.log('inserted', result, 'props:', this.props);
      const { listId } = result;
      const { router } = this.props;
      router.push(`/${listId}`);
    })
    .catch(error => console.log(error));
  }

  render() {
    var listArray = _.map(this.state.lists, (list) => {
      return <div className="list-group-item" key = {list.id}><Link to={'/'+ list.id}>{list.title}</Link></div>
    });
    return (
      <div>
        <h1>My Lists</h1>
        <button  onClick={this.newList} className="btn btn-default">Add</button>
        <div className="list-group">{listArray}</div>
      </div>
    );
  }


}
export default ListsIndex;
