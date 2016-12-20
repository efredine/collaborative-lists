import React, {Component} from 'react';
import MovieContainer from '../containers/movieContainers.jsx'
import LoginContainer from '../containers/LoginContainer.js';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Grid, Row, Col } from 'react-bootstrap';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Lists from './Lists.jsx';
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
              <Tabs
                selectedIndex={0}
              >
                <TabList>
                  <Tab>Movies</Tab>
                  <Tab>Todos</Tab>
                </TabList>
                <TabPanel>
                  <MovieContainer className="panel-container"/>
                </TabPanel>
                <TabPanel>
                  <AddTodo />
                </TabPanel>
              </Tabs>
            </Col>
            <Col className="historyContainer" xs={6} md={4}>
              <Router history={browserHistory}>
                <Route path="/" >
                  <IndexRoute component={Lists} />
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