import React from 'react'
import FilterLink from '../containers/FilterLink'
import { Nav, NavItem, Glyphicon } from 'react-bootstrap'

const Footer = () => (
  <div>
    <Nav bsStyle="pills" pullLeft>
      <NavItem>
       <Glyphicon onClick={ () => {} } glyph="glyphicon glyphicon-sort"/>
      </NavItem>
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