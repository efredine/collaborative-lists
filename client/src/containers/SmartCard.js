import React, {Component, PropTypes} from 'react';
import ContentTypes from '../types/ContentTypes';
import Todo from '../components/Todo'
import Movie from '../components/Movie.jsx'
import Yelp from '../components/Yelp.jsx'

/**
 * Renders the card based on the card content type.
 */
class SmartCard extends Component {

  cardForContentType = (contentType) => {
    switch(contentType) {
      case ContentTypes.TODO:
        return Todo;
      case ContentTypes.MOVIE:
        return Movie;
      case ContentTypes.YELP:
        return Yelp;
      default:
        return undefined;
    }
  }

  render() {
    const {content} = this.props;
    const Card = this.cardForContentType(content.contentType);
    return(
      <Card {...this.props} />
    );
  }
}
export default SmartCard;
