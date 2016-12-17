import React, {Component} from 'react';
import MovieContainer from '../containers/movieContainers.jsx'
import NavBar from './NavBar.jsx'

class App extends Component {

  render() {
    return(
      <div>
        <NavBar/>
        <div className="panel-container">
          <MovieContainer/>
        </div>
      </div>
    );
  }
}
export default App;
