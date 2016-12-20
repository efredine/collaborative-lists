import React, {Component} from 'react';
import fetch from 'isomorphic-fetch';
import _ from 'lodash';
import InlineEdit from 'react-edit-inline';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: []
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
  .then(lists => {
    console.log('lists',lists);
    this.setState({lists: lists});
  })
}

  render() {
    // const listToRender = _.map(this.state.lists, (listItem)=>{
    //   return  <li>{listItem}</li>
    // });
    // console.log(listToRender);
    // const result = this.state.lists.length > 0 ? this.state.lists[0] : "";
    const {lists} = this.state;
    let title = "";
    if(lists.length === 1) {
      title = lists[0].title;
    }
    return (
      <div>
        List Title: {title}
      </div>
      );
    }

}

export default List;
