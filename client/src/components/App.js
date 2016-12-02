import React, {Component} from 'react';
import Footer from './Footer'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'
import fetch from 'isomorphic-fetch'

class App extends Component {

  componentDidMount() {
    var socket = io('http://localhost:8080');
    socket.on('news', function (data) {
      console.log(data);
      socket.emit('my other event', { my: 'data' });
    });

    fetch('http://localhost:8080/api/list')
    .then(function(response) {
      return response.text();
    })
    .then(function(responseText) {
      console.log(responseText);
    });

    fetch("http://localhost:8080/api/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: "theThing=something"
    }).then(function(res) {
      console.log("Submission response:", res);
    }, function(e) {
      console.log("Error submitting form:", e);
    });
  }

  render() {
    return (
      <div>
        <AddTodo />
        <VisibleTodoList />
        <Footer />
      </div>
    );
  }
}
export default App;

// const App = () => (
//   <div>
//     <AddTodo />
//     <VisibleTodoList />
//     <Footer />
//   </div>
// )

// export default App
