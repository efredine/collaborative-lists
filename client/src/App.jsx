import React, {Component} from 'react';

class App extends Component {

  componentDidMount() {
    var socket = io('http://localhost:8080');
    socket.on('news', function (data) {
      console.log(data);
      socket.emit('my other event', { my: 'data' });
    });
  }

  render() {
    return (
      <h1>Hello React :)</h1>
    );
  }
}
export default App;
