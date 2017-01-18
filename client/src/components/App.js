import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import MovieSearch from '../containers/MovieSearch.jsx';
import LoginContainer from '../containers/LoginContainer.js';
import ChatBox from '../containers/ChatBox';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Grid, Row, Col, Tabs, Tab, Clearfix } from 'react-bootstrap';
import ListsIndex from './ListsIndex.jsx';
import List from './List.jsx';
import AddTodo from '../containers/AddTodo';
import ActionListContainer from '../containers/ActionListContainer.jsx';
import { Link } from 'react-router';
import { Glyphicon } from 'react-bootstrap';
import YelpSearch from '../containers/YelpSearch.jsx';
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

  isAuthorized = () => {
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

  menu = () => {
    const { defaultEventKey } = this.props;
    if(this.state.open) {
      if(this.state.selected === 1) {
        return(
          <Col className="movieContainer" xs={4} lg={4}>
            <div className="content">
              <Tabs defaultActiveKey={defaultEventKey} id="uncontrolled-tab-example">
                <Tab eventKey={1} title="Movies">
                  <MovieSearch className="panel-container"/>
                </Tab>
                <Tab eventKey={2} title="Yelp">
                  <YelpSearch className="panel-container"/>
                </Tab>
                <Tab eventKey={3} title="Todos">
                  <AddTodo />
                </Tab>
              </Tabs>
            </div>
          </Col>
          );
      } else {
        return(
          <Col className="movieContainer" xs={4} lg={4}>
            <ListsIndex/>
          </Col>
          );
      }
    } else {
      return(<div></div>)
    }
  }

  unAuthorized = () => {
    return (
      <Row className="show-grid">
        <Col xs={12}>You have to log in.</Col>
      </Row>
    );
  }

  authorized = () => {
    const { open } = this.state;
    const { listId } = this.props.params;
    return (
      <Row className="show-grid">
        { this.menu() }
        <Col className="historyContainer" xs={open ? 5 : 7} lg={open ? 5 : 7}>
          <List listId={ listId } />
        </Col>
        <Col className="chatContainer" xs={open ? 3 : 5} lg={open ? 3 : 5}>
          <h1>Activity</h1>
          <ActionListContainer/>
          <ChatBox />
        </Col>
      </Row>
    );
  }

  render() {
    const { open } = this.state;
    return(
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <img className="logo" src="/images/Upik.png" />
            </Navbar.Brand>
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
          { this.isAuthorized() ? this.authorized() : this.unAuthorized() }
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