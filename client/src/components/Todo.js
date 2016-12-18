import React, { PropTypes } from 'react'

const Todo = ({ onClick, completed, content }) => (
  <div
    onClick={onClick}
    style={{
      textDecoration: completed ? 'line-through' : 'none'
    }}
  >
    {content.text}
  </div>
)

// Todo.propTypes = {
//   onClick: PropTypes.func.isRequired,
//   completed: PropTypes.bool.isRequired,
//   text: PropTypes.string.isRequired
// }

export default Todo
