import React, {Component} from 'react';
import fetch from 'isomorphic-fetch';
import _ from 'lodash';
import InlineEdit from 'react-edit-inline';
import Footer from './Footer'
import VisibleCardList from '../containers/VisibleCardList'
import { browserHistory } from 'react-router';

import { connect } from 'react-redux'
import { fetchTodos } from '../actions'



class List extends Component {

  constructor(props) {
    super(props);
    this.dataChanged = this.dataChanged.bind(this);
    this.state = {
      listContainer: {},
      title: "",

    }
}

componentDidMount() {
  this.props.fetchTodos();

  const listId = this.props.params.listId;
  fetch(`/api/lists/${listId}`, {
    credentials: 'include'
  })
  .then(response => {
    return response.json();
  })
  .then(results => {
    const listContainer = results.length === 1 ? results[0] : {};
    this.setState({listContainer: listContainer, title: listContainer.title});
  })
}

dataChanged = (data) => {
  const listId = this.props.params.listId;
  fetch('/api/lists/update', {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
      body: `id=${listId}&title=${data.Title}`
  })
  .then(response => response.json())
  .then(json => console.log('updated', json))
  .catch(error => console.log(error));

}
  render() {
    const {title} = this.state;
    return (
      <div className="list-container">
        <h1>
         <a href="#" onClick={() => browserHistory.push("/")}>Lists!</a> {"> "}
          <InlineEdit
            text={title}
            paramName="Title"
            change= {this.dataChanged}
          />
        </h1>
        <div className="content">
        <VisibleCardList />
        <Footer />
        </div>
      </div>
      );
    }

}

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchTodos: () => {
    dispatch(fetchTodos(ownProps.params.listId))
  }
})

const ListContainer = connect(
  null,
  mapDispatchToProps
)(List);

export default ListContainer;
