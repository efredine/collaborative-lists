import React, {Component} from 'react';
import fetch from 'isomorphic-fetch';
import _ from 'lodash';
import InlineEdit from 'react-edit-inline';

class List extends Component {

  constructor(props) {
    super(props);
    this.dataChanged = this.dataChanged.bind(this);
    this.state = {
      listContainer: {},
      title: "",

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
    this.setState({listContainer: listContainer, title: listContainer.title});

  })
}

dataChanged = (data) => {
  console.log(data.Title);
  const listId = this.props.params.listId;
  console.log(listId);
    fetch('/api/lists/update', {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
        body: `id=${listId}&title=${data.Title}`
    })
    .then(response => response.json())
    .then(json => console.log('updated', json))
    .catch(error => console.log(error));

}
  render() {
    // const listToRender = _.map(this.state.lists, (listItem)=>{
    //   return  <li>{listItem}</li>
    // });
    // console.log(listToRender);
    // const result = this.state.lists.length > 0 ? this.state.lists[0] : "";
    const {title} = this.state;
    return (
      <h1><InlineEdit
              text={title}
              paramName="Title"
              change= {this.dataChanged}
              style={{
                minWidth: 150,
                display: 'inline-block',
                margin: 0,
                padding: 0,
                fontSize: 15,
                outline: 0,
                border: 0
              }}
            /></h1>
      );
    }

}

export default List;
