import React, {Component} from 'react';
import MovieSearch from '../containers/MovieSearch.jsx'
import LoginContainer from '../containers/LoginContainer.js';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Grid, Row, Col, Tabs, Tab } from 'react-bootstrap';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import ListsIndex from './ListsIndex.jsx';
import List from './List.jsx';
import AddTodo from '../containers/AddTodo'
import ActionListContainer from '../containers/ActionListContainer.jsx'

class App extends Component {

  render() {
    return(
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">React-Bootstrap</a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
              <MenuItem eventKey={3.1}>Action</MenuItem>
              <MenuItem eventKey={3.2}>Another action</MenuItem>
              <MenuItem eventKey={3.3}>Something else here</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={3.3}>Separated link</MenuItem>
            </NavDropdown>
          </Nav>
          <LoginContainer/>
        </Navbar>
        <Grid>

          <Row className="show-grid">
            <Col className="movieContainer" xs={6} md={4}>
              <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                <Tab eventKey={1} title="Movies">
                  <MovieSearch className="panel-container"/>
                </Tab>
                <Tab eventKey={2} title="Todos">
                  <AddTodo />
                </Tab>
              </Tabs>
            </Col>
            <Col className="historyContainer" xs={6} md={4}>
              <Router history={browserHistory}>
                <Route path="/" >
                  <IndexRoute component={ListsIndex} />
                  <Route path="/:listId" component={List} />
                </Route>
              </Router>
                </Col>
            <Col className="chatContainer" xsHidden md={4}>
              <ActionListContainer />
            </Col>
          </Row>

        </Grid>
      </div>
    );
  }
}
export default App;