import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'
import { toggleSortByVote } from '../actions'
import { Glyphicon, NavItem } from 'react-bootstrap'

class SortControl extends Component {

  blurNavItem = navItem => {
    ReactDOM.findDOMNode(this.navItem).querySelector('a').blur();
  }

  handleClick = () => {
    this.props.toggleSortByVote();
    this.blurNavItem();
  }

  render() {
    const { sortByVote } = this.props;
    return (
      <NavItem active={ sortByVote } onClick={ this.handleClick } ref={(navItem) => { this.navItem = navItem; }} >
        <Glyphicon glyph="glyphicon glyphicon-sort"/>
      </NavItem>
    );
  }
}

const mapStateToProps = state => ({
  sortByVote: state.sortByVote
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  toggleSortByVote: () => dispatch(toggleSortByVote())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SortControl);