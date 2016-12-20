import React, {Component} from 'react';
import fetch from 'isomorphic-fetch';
import _ from 'lodash';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listContainer: {}
    }
}

componentDidMount() {
  const listId = this.props.params.listId;
  console.log('listId: ', listId);
  fetch(`/api/lists/${listId}`, {
    credentials: 'include'
  })
  .then(response => {
    return response.json();
    console.log(response)
  })
  .then(results => {
    console.log('results', results);
    const listContainer = results.length === 1 ? results[0] : {};
    this.setState({listContainer: listContainer});
  })
}
  render() {
    // const listToRender = _.map(this.state.lists, (listItem)=>{
    //   return  <li>{listItem}</li>
    // });
    // console.log(listToRender);
    // const result = this.state.lists.length > 0 ? this.state.lists[0] : "";
    const {listContainer} = this.state;
    return (
      
      <div>
        List Title: {listContainer.title}
      </div>
      );
    }

}

export default List;
