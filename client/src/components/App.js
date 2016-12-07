import React, {Component} from 'react';
import Footer from './Footer'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';


class App extends Component {

  componentDidMount() {

  }

  handleSelect(index, last) {
    console.log('Selected tab: ' + index + ', Last tab: ' + last);
  }

  render() {
    // return (
    //   <div>
    //     <AddTodo />
    //     <VisibleTodoList />
    //     <Footer />
    //   </div>
    // );

    return (
      <Tabs
        onSelect={this.handleSelect}
        selectedIndex={0}
      >
        <TabList>
          <Tab>Foo</Tab>
          <Tab>Bar</Tab>
        </TabList>

        <TabPanel>
          <AddTodo />
          <VisibleTodoList />
          <Footer />
        </TabPanel>
        <TabPanel>
          <h2>Hello from Bar</h2>
        </TabPanel>

      </Tabs>
    );
  }
}
export default App;
