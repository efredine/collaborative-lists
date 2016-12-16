import { connect } from 'react-redux'
import { fetchTodos } from '../actions'
import TodoApp from '../components/TodoApp.js'

const mapDispatchToProps = (dispatch) => ({
  fetchTodos: () => {
    dispatch(fetchTodos())
  }
})

const TodoAppContainer = connect(
  null,
  mapDispatchToProps
)(TodoApp);

export default TodoAppContainer;
