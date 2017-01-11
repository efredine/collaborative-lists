import React, { PropTypes } from 'react'
const style = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '1rem',
  marginTop: '1rem',
  backgroundColor: 'white'
};

const Todo = ({ onClick, completed, content, canDrag }) => (
  <div
    onClick={onClick}
    style={{...style,
      cursor: canDrag ? 'move' : 'auto',
      textDecoration: completed ? 'line-through' : 'none'
    }}
  >
    {content.text}
  </div>
)

Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  content: PropTypes.object.isRequired
}

export default Todo
