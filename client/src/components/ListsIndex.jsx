import React, {Component} from 'react';
import fetch from 'isomorphic-fetch';
import _ from 'lodash';
import { Link } from 'react-router'
import { fetchLists } from '../actions'
import { connect } from 'react-redux'

class ListsIndex extends Component {

  componentDidMount() {
    const { fetchLists } = this.props;
    fetchLists();
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
    const { lists } = this.props;
    const listArray = _.map(lists, (list) => {
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

const mapStateToProps = (state) => ({
  lists: state.lists.allIds.map(id => state.lists.byId[id])
})

const mapDispatchToProps =  ({
  fetchLists: fetchLists
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListsIndex)
