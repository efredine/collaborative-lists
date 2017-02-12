import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'react-bootstrap';
import MovieSearch from '../containers/MovieSearch.jsx';
import AddTodo from '../containers/AddTodo';
import YelpSearch from '../containers/YelpSearch.jsx';

class Builder extends Component {
  render() {
    const { defaultEventKey } = this.props;
    return (
       <Tabs defaultActiveKey={defaultEventKey}>
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
})

export default connect(
  mapStateToProps,
  null
)(Builder);