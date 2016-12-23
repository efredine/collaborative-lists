import React, {Component} from 'react';
import MovieSearch from '../containers/MovieSearch.jsx'
import LoginContainer from '../containers/LoginContainer.js';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Grid, Row, Col, Tabs, Tab } from 'react-bootstrap';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import ListsIndex from './ListsIndex.jsx';
import List from './List.jsx';
import AddTodo from '../containers/AddTodo'
import ActionListContainer from '../containers/ActionListContainer.jsx'
import { Link } from 'react-router';
import YelpSearch from '../containers/YelpSearch.jsx'

class App extends Component {

  render() {
    return(
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#" onClick={() => browserHistory.push("/")}>Lists!</a>
            </Navbar.Brand>
          </Navbar.Header>
          <LoginContainer/>
        </Navbar>
        <Grid>

          <Row className="show-grid">
            <Col className="movieContainer" xs={6} md={4}>
              <h1>List Builders</h1>
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
            <Col className="historyContainer" xs={6} md={6}>
              <Router history={browserHistory}>
                <Route path="/" >
                  <IndexRoute component={ListsIndex} />
                  <Route path="/:listId" component={List} />
                </Route>
              </Router>
            </Col>
            <Col className="chatContainer" xsHidden md={2}>
              <h1>Activity</h1>
              <div className="content">
                <ActionListContainer/>
              </div>
              <div>On the bottom</div>
            </Col>
          </Row>

        </Grid>
      </div>
    );
  }
}
export default App;
