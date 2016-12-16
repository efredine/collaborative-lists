import React, {Component} from 'react';
import MovieContainer from '../containers/movieContainers.jsx'
import Layout from './Layout.js'
class App extends Component {

  render() {
    return(
      <div>
        <MovieContainer/>
      </div>
    );
  }
}
export default App;
