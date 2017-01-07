import React, {Component} from 'react';
import fetch from 'isomorphic-fetch';
import _ from 'lodash';
import InlineEdit from 'react-edit-inline';
import Footer from './Footer'
import VisibleCardList from '../containers/VisibleCardList'
import { browserHistory } from 'react-router';

import { connect } from 'react-redux'
import { fetchActions } from '../actions'

class List extends Component {

  componentDidMount() {
    this.props.fetchActions();
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
    const {title} = this.props;
    return (
      <div className="list-container">
        <h1>
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

const mapStateToProps = (state, ownProps) => {
  const list = state.lists.byId[ownProps.params.listId];
  return {title: list ? list.title : ""};
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchActions: () => {
    dispatch(fetchActions(ownProps.params.listId))
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);