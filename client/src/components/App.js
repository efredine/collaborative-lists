import React, {Component} from 'react';
import ReactDOM from 'react-dom'
import MovieSearch from '../containers/MovieSearch.jsx'
import LoginContainer from '../containers/LoginContainer.js';
import ChatBox from '../containers/ChatBox';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Grid, Row, Col, Tabs, Tab, Clearfix } from 'react-bootstrap';
import ListsIndex from './ListsIndex.jsx';
import List from './List.jsx';
import AddTodo from '../containers/AddTodo'
import ActionListContainer from '../containers/ActionListContainer.jsx'
import { Link } from 'react-router';
import { Glyphicon } from 'react-bootstrap';
import YelpSearch from '../containers/YelpSearch.jsx'

class App extends Component {

  constructor(...args) {
    super(...args);
    this.state = {
      open: true,
      selected: 1
    };
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
    if(this.state.open) {
      if(this.state.selected === 1) {
        return(
          <Col className="movieContainer" xs={6} sm={4}>
            <div className="content">
              <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
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
          <Col className="movieContainer" xs={6} sm={4}>
            <ListsIndex/>
          </Col>
          );
      }
    } else {
      return(<div></div>)
    }
  }

  render() {
    const { open } = this.state;
    const { listId } = this.props.params;
    return(
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <img className="logo" src="http://localhost:8080/images/Upik.png" onClick={() => browserHistory.push("/")} / >
            </Navbar.Brand>
          </Navbar.Header>
          <Nav activeKey={this.state.open && this.state.selected} onSelect={this.handleSelect}>
            <NavItem eventKey={1} ref={(navItem) => { this.navItemBuilder = navItem; }} href="#">Builder</NavItem>
            <NavItem eventKey={2} ref={(navItem) => { this.navItemLists = navItem; }} href="#">Lists</NavItem>
          </Nav>
          <LoginContainer/>
        </Navbar>
        <Grid>
          <Row className="show-grid">
            {this.menu()}
            <Col className="historyContainer" xs={6} md={open ? 5 : 7}>
              <List listId={ listId } />
            </Col>
            <Col className="chatContainer" xsHidden md={open ? 3 : 5}>
              <h1>Activity</h1>
              <ActionListContainer/>
              <ChatBox />
            </Col>
          </Row>
          <Clearfix/>
          <footer>Lists!</footer>
        </Grid>
      </div>
    );
  }
}
export default App;
