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
        // const names = JSON.parse(responseText);
        console.log('names',names);
        this.setState({names: names});
        // this.setState({
        //   numberOfNames: movies.results.length,
        //   names: movies.results,
        // });
        //  console.log('responseText', responseText)
      })


  }

  render() {

    var names = _.map(this.state.names, (name) => {
      return <li key = {name.id}>{name.name}</li>
    })
    return (
      <div>
          <h1>{names}</h1>
      </div>
    );
  }


}
export default lists;
