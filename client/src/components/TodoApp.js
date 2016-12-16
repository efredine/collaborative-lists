import React, {Component} from 'react';
import Footer from './Footer'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ActionListContainer from '../containers/ActionListContainer.jsx'
import fetch from 'isomorphic-fetch'


class TodoApp extends Component {

  componentDidMount() {
    this.props.fetchTodos();
  }

  handleSelect(index, last) {
    console.log('Selected tab: ' + index + ', Last tab: ' + last);
  }

  render() {
    return (
      <Tabs
        onSelect={this.handleSelect}
        selectedIndex={0}
      >
        <TabList>
          <Tab>List</Tab>
          <Tab>History</Tab>
        </TabList>

        <TabPanel>
          <AddTodo />
          <VisibleTodoList />
          <Footer />
        </TabPanel>
        <TabPanel>
          <ActionListContainer />
        </TabPanel>

      </Tabs>
    );
  }
}
export default TodoApp;
