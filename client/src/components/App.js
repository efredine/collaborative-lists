import React, {Component} from 'react';
import MovieSearch from '../containers/MovieSearch.jsx'
import LoginContainer from '../containers/LoginContainer.js';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Grid, Row, Col, Tabs, Tab } from 'react-bootstrap';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import ListsIndex from './ListsIndex.jsx';
import List from './List.jsx';
import AddTodo from '../containers/AddTodo'
import { Glyphicon } from 'react-bootstrap';
import ActionListContainer from '../containers/ActionListContainer.jsx'
import { Link } from 'react-router'

class App extends Component {

  constructor(...args) {
    super(...args);
    this.state = {
      open: true,
      chatcol: 2,
      constructcol: 4,
      historycol: 6
    };
  }

  toggleCollapse = () => {
    console.log("toggling");
    if (this.state.open) {
      this.setState ({
          open: false,
          chatCol: 6,
          constructcol: 0
        });
      } else {
      this.setState({
        open:true,
        chatCol: 2,
        constructcol: 4,
        historycol: 6
      })
    }
  }

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
            <Col className={"movieContainer"+this.state.open}  xs={6} md={this.state.constructcol}>
              <h1>List Builders</h1>
              <div className="drop">
              </div>
              <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                <Tab eventKey={1} title="Movies">
                  <MovieSearch className="panel-container"/>
                </Tab>
                <Tab eventKey={2} title="Todos">
                  <AddTodo />
                </Tab>
              </Tabs>
            </Col>
            <div className={"hide-builder" + this.state.open}>
              <Glyphicon onClick={this.toggleCollapse} glyph="glyphicon glyphicon-transfer"/>
            </div>
            <Col className={"historyContainer" + this.state.open} xs={6} md={this.state.historycol}>
              <Router history={browserHistory}>
                <Route path="/" >
                  <IndexRoute component={ListsIndex} />
                  <Route path="/:listId" component={List} />
                </Route>
              </Router>
                </Col>
            <Col className="chatContainer" xs={2} md={this.state.chatCol}>
              <h1>Activity</h1>
              <ActionListContainer/>
            </Col>
          </Row>

        </Grid>
      </div>
    );
  }
}
export default App;