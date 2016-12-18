import React, {Component} from 'react';
import fetch from 'isomorphic-fetch';
import _ from 'lodash'


class lists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.names
    };
  }


  componentDidMount() {
      fetch('http://localhost:8080/api/lists')
      .then(response => {
        return response.json();
      })
      .then(names => {
        console.log('names',names);
        this.setState({names: names});
      })
  }

  render() {
    var list = _.map(this.state.names, (name) => {
      return <li key = {name.id}>{name.title}</li>
    });
    return (
      <div>
          <h1>{list}</h1>
      </div>
    );
  }


}
export default lists;
