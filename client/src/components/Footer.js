import React from 'react'
import FilterLink from '../containers/FilterLink'
import { Nav, NavItem } from 'react-bootstrap'
import SortControl from '../containers/SortControl'

const Footer = () => (
  <div>
    <Nav bsStyle="pills" pullLeft>
      <SortControl/>
    </Nav>
    <Nav bsStyle="pills" pullRight>
      <FilterLink filter="SHOW_COMPLETED">
        Deleted
      </FilterLink>
      <FilterLink filter="SHOW_ACTIVE">
        Active
      </FilterLink>
    </Nav>
  </div>
)

export default Footer