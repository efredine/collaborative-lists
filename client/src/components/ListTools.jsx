import React, {Component} from 'react';
import ChatBox from '../containers/ChatBox';
import { Grid, Row, Col, Clearfix } from 'react-bootstrap';
import ListsIndex from './ListsIndex.jsx';
import List from './List.jsx';
import ActionListContainer from '../containers/ActionListContainer.jsx';
import Auth from '../utils/Auth';
import LoginPage from './LoginPage.jsx';
import Builder from './Builder';

class ListTools extends Component {

  menu = (defaultEventKey, open, selected) => {
    if(open) {
      if(selected === 1) {
        return(
          <Col className="left-column" xs={4} lg={4}>
            <div className="content">
              <Builder />
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
      <Col className="action-history-container" xs={open ? 3 : 5} lg={open ? 3 : 5}>
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