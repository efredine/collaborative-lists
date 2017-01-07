import { connect } from 'react-redux'
import { fetchActions } from '../actions'
import TodoApp from '../components/TodoApp.js'

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchActions: () => {
    dispatch(fetchActions(ownProps.params.listId))
  }
})

const TodoAppContainer = connect(
  null,
  mapDispatchToProps
)(TodoApp);

export default TodoAppContainer;
