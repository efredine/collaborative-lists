import React, {Component} from 'react';
import MovieSearch from '../containers/MovieSearch.jsx'
import LoginContainer from '../containers/LoginContainer.js';
import ChatBox from '../containers/ChatBox';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Grid, Row, Col, Tabs, Tab, Clearfix } from 'react-bootstrap';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
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
      open: true
    };
  }

  handleSelect = event => {
    if(event === 1) {
      this.setState({ open: !this.state.open })
    }
  }

  builderContent = open => {
    if(open) {
      return(
      <Col className="movieContainer" xs={6} sm={open ? 4 : 1}>
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
      return(<div></div>)
    }
  }

  render() {
    const { open } = this.state;
    return(
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <img className="logo" src="http://localhost:8080/images/Upik.png" onClick={() => browserHistory.push("/")} / >
            </Navbar.Brand>
          </Navbar.Header>
          <Nav activeKey={this.state.open && 1} onSelect={this.handleSelect}>
            <NavItem eventKey={1} href="#">Builder</NavItem>
            <NavItem eventKey={2} href="#">Link</NavItem>
          </Nav>
          <LoginContainer/>
        </Navbar>
        <Grid>
          <Row className="show-grid">
            {this.builderContent(open)}
            <Col className="historyContainer" xs={6} md={open ? 5 : 7}>
              <Router history={browserHistory}>
                <Route path="/" >
                  <IndexRoute component={ListsIndex} />
                  <Route path="/:listId" component={List} />
                </Route>
              </Router>
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
