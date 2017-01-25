import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import LoginContainer from '../containers/LoginContainer';
import ListTools from './ListTools.jsx'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Grid, Row, Col, Clearfix } from 'react-bootstrap';
import { Glyphicon } from 'react-bootstrap';
import Footer from './Footer';
import ContentTypes from '../types/ContentTypes';
import { connect } from 'react-redux';

class App extends Component {

  constructor(...args) {
    super(...args);
    this.state = {
      open: false,
      selected: undefined
    };
  }

  isLoaded = () => {
    const { users, user } = this.props;
    return users.allIds.length > 0 && user.userInitialized && user.id;
  }

  blurNavItem = navItem => {
    ReactDOM.findDOMNode(navItem).querySelector('a').blur();
  }

  handleSelect = eventKey => {
    const sameKey = eventKey === this.state.selected;
    const open = sameKey ? !this.state.open : true;
    const updatedState = {
      open: open,
      selected: open && eventKey
    }
    if(!open) {
      if(eventKey === 1) {
        this.blurNavItem(this.navItemBuilder);
      }
      if(eventKey === 2) {
        this.blurNavItem(this.navItemLists);
      }
    }
    this.setState(updatedState);
  }

  render() {
    const { open, selected } = this.state;
    const { defaultEventKey, listId, history } = this.props;
    return(
      <div>
        <Navbar>
          <Navbar.Header>
              <img className="logo" src="/images/Upik.png" />
          </Navbar.Header>
          <Nav activeKey={this.state.open && this.state.selected} onSelect={this.handleSelect}>
            <NavItem eventKey={1} ref={(navItem) => { this.navItemBuilder = navItem; }} href="#">
            <img className="builder" src="/images/builder.png" />
            </NavItem>
            <NavItem eventKey={2} ref={(navItem) => { this.navItemLists = navItem; }} href="#">
              <img className="lists" src="/images/lists.png" />
            </NavItem>
          </Nav>
          <LoginContainer/>
        </Navbar>

        <Grid>
          <ListTools
            open={open}
            selected={selected}
            listId={listId}
            history={history}
            defaultEventKey={defaultEventKey}
            enabled={this.isLoaded()}
          />
          <Clearfix/>
          <footer>Lists!</footer>
        </Grid>

      </div>
    );
  }
}

const ContentTypeToEventKeyMap = {
  "movie": 0,
  "yelp": 1,
  "todo": 2
}

function getContentTypeCounts(cards) {
  return cards.reduce((counts, card) => {
    if(!card.completed) {
      counts[ContentTypeToEventKeyMap[card.content.contentType]] += 1;
    }
    return counts;
  }, [0, 0, 0]);
}

function getEventKeyDefault(state) {
  const { cards } = state;
  if(cards && cards.length > 0) {
    const counts = getContentTypeCounts(cards);
    const max = counts.reduce((a, b) => b > a ? b : a);
    return counts.indexOf(max) + 1;
  } else {
    return 1;
  }
}

const mapStateToProps = (state) => ({
  defaultEventKey: getEventKeyDefault(state),
  users: state.users,
  user: state.user
})

export default connect(
  mapStateToProps,
  null
)(App);