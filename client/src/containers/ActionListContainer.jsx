import { connect } from 'react-redux'
import ActionList from '../components/ActionList.jsx'

const mapStateToProps = (state) => ({
  actions: state.actions
})

const ActionListContainer = connect(
  mapStateToProps,
)(ActionList)

export default ActionListContainer