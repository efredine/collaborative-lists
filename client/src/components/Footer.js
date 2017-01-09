import React from 'react'
import FilterLink from '../containers/FilterLink'
import { Nav, Navbar } from 'react-bootstrap'

const Footer = () => (
  <Nav bsStyle="pills" pullRight>
    <FilterLink filter="SHOW_COMPLETED">
      Completed/Deleted
    </FilterLink>
    <FilterLink filter="SHOW_ALL">
      All
    </FilterLink>
    <FilterLink filter="SHOW_ACTIVE">
      Active
    </FilterLink>
  </Nav>
)

export default Footer
