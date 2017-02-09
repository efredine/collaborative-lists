import React, {Component} from 'react';
import MovieSearch from '../containers/MovieSearch.jsx';
import ChatBox from '../containers/ChatBox';
import { Grid, Row, Col, Tabs, Tab, Clearfix } from 'react-bootstrap';
import ListsIndex from './ListsIndex.jsx';
import List from './List.jsx';
import AddTodo from '../containers/AddTodo';
import ActionListContainer from '../containers/ActionListContainer.jsx';
import YelpSearch from '../containers/YelpSearch.jsx';
import Auth from '../utils/Auth';
import LoginPage from './LoginPage.jsx'

class ListTools extends Component {

  menu = (defaultEventKey, open, selected) => {
    if(open) {
      if(selected === 1) {
        return(
          <Col className="left-column" xs={4} lg={4}>
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
          <Col className="left-column" xs={4} lg={4}>
            <ListsIndex history={this.props.history}/>
          </Col>
          );
      }
    } else {
      return(<div></div>)
    }
  }

  main = (open, listId) => {
    return(
       <Col className="active-list-container" xs={open ? 5 : 7} lg={open ? 5 : 7}>
         <List listId={ listId } history={this.props.history}/>
       </Col>
      );
  }

  activity = (open) => {
    return (
      <Col className="chatContainer" xs={open ? 3 : 5} lg={open ? 3 : 5}>
         <h1>Activity</h1>
         <ActionListContainer/>
         <ChatBox />
       </Col>
     );
  }

  render() {
    const { open, selected, listId, defaultEventKey, enabled } = this.props;
    const authenticated = Auth.isUserAuthenticated();
    const loaded = authenticated && enabled;
    return(
      <Row className="show-grid">
       { enabled && this.menu(defaultEventKey, open, selected) }
       { enabled && this.main(open, listId) }
       { enabled && this.activity(open) }
       { !authenticated && <LoginPage/> }
     </Row>
    );
  }
}
export default ListTools;