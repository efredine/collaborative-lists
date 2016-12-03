import React, {Component} from 'react';
import Footer from './Footer'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'
import fetch from 'isomorphic-fetch'

class App extends Component {

  componentDidMount() {

    // fetch("http://localhost:8080/api/update", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/x-www-form-urlencoded"
    //   },
    //   body: "theThing=something"
    // }).then(function(res) {
    //   console.log("Submission response:", res);
    // }, function(e) {
    //   console.log("Error submitting form:", e);
    // });
  }

  render() {
    return (
      <div>
        <AddTodo />
        <VisibleTodoList
          filter={this.props.params.filter || 'all'}
        />
        <Footer />
      </div>
    );
  }
}
export default App;
