import { connect } from 'react-redux'
import { fetchTodos } from '../actions'
import TodoApp from '../components/TodoApp.js'

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchTodos: () => {
    dispatch(fetchTodos(ownProps.params.listId))
  }
})

const TodoAppContainer = connect(
  null,
  mapDispatchToProps
)(TodoApp);

export default TodoAppContainer;
