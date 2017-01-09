import React, {Component} from 'react';
import fetch from 'isomorphic-fetch';
import _ from 'lodash';
import { Link, browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { Button, ListGroup, ListGroupItem } from 'react-bootstrap'

class ListsIndex extends Component {

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
      browserHistory.push(`/${listId}`);
    })
    .catch(error => console.log(error));
  }

  render() {
    const { lists, activeList } = this.props;
    const listArray = _.map(lists, (list) => {
      return (
        <ListGroupItem key = {list.id} active={Number(list.id) === Number(activeList)}>
          <Link to={'/'+ list.id}>{list.title}</Link>
        </ListGroupItem>
      );
    });
    return (
      <div className="content">
        <Button className="list-index-button" onClick={this.newList} block>New list...</Button>
        <ListGroup className="nav">{listArray}</ListGroup>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  lists: state.lists.allIds.map(id => state.lists.byId[id]),
  activeList: state.activeList
})

export default connect(
  mapStateToProps,
  null
)(ListsIndex)
