import React, {Component} from 'react';
import MovieContainer from '../containers/movieContainers.jsx'
import Layout from './Layout.js'
class App extends Component {

  render() {
    return(
      <div>
        <h1>Hello World Again</h1>
        <MovieContainer/>
        <Layout/>
      </div>
    );
  }
}
export default App;
