import React, {Component} from 'react';
import fetch from '../utils/fetch';
import _ from 'lodash';
import InlineEdit from 'react-edit-inline';
import Footer from './Footer'
import VisibleCardList from '../containers/VisibleCardList'

import { connect } from 'react-redux'
import { fetchActiveIfNeeded } from '../actions'

class List extends Component {

  redirectIfNeeded = () => {
    // if listId is null it means the user has navigated to the home directory
    // redirect them to the first element of the list
    const { listId, lists } = this.props;
    if(!listId && lists.length > 0) {
      this.props.history.push(`/${lists[0].list.id}`)
    }
  }

  componentDidMount() {
    this.props.fetchActiveIfNeeded();
  }

  componentWillReceiveProps(nextProps) {
    // TODO: review lifecycle of List component
    nextProps.fetchActiveIfNeeded();
  }

  componentDidUpdate() {
    this.redirectIfNeeded();
  }

  dataChanged = (data) => {
    const listId = encodeURIComponent(this.props.listId);
    const title = encodeURIComponent(data.Title);
    fetch('/api/lists/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
        body: `id=${listId}&title=${title}`
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
        </div>
        <Footer />
      </div>
    );
  }
}

const getTitle = list => {
  const valid = list && !list.error && !list.fetching;
  return valid ? list.list.title : "";
}

const mapStateToProps = (state, ownProps) => {
  const list = state.lists.byId[ownProps.listId];
  return {
    title: getTitle(list),
    lists: state.lists.allIds.map(id => state.lists.byId[id]).filter(x => x.list),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchActiveIfNeeded: () => {
    dispatch(fetchActiveIfNeeded(ownProps.listId))
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);