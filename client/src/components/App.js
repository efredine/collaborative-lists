import React, {Component} from 'react';
import MovieContainer from '../containers/movieContainers.jsx'
import LoginContainer from '../containers/LoginContainer.js';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Grid, Row, Col } from 'react-bootstrap';


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
      <Col xs={6} md={4}>
        <MovieContainer className="panel-container"/>
      </Col>
      <Col xs={6} md={4}>
        <MovieContainer className="panel-container"/>
      </Col>
      <Col xsHidden md={4}>
        <MovieContainer className="panel-container"/>
      </Col>
    </Row>

  </Grid>
      </div>
    );
  }
}
export default App;