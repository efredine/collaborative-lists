import React from 'react'
import FilterLink from '../containers/FilterLink'
import { Nav, NavItem, Button, Glyphicon } from 'react-bootstrap'
import SortControl from '../containers/SortControl'
import MediaQuery from 'react-responsive';

const Footer = () => (
  <div>
    <Nav bsStyle="pills" pullLeft>
      <SortControl/>
      <FilterLink filter="SHOW_COMPLETED">
        Deleted
      </FilterLink>
      <FilterLink filter="SHOW_ACTIVE">
        Active
      </FilterLink>
    </Nav>
    <MediaQuery minWidth={768}>
      {(matches) => {
        if(!matches) {
          return(
            <Nav bsStyle="pills" pullRight>
              <Button bsStyle="danger" className="btn-circle btn-lg list-btn-add">
                <Glyphicon glyph="plus"/>
              </Button>
            </Nav>
          );
        } else {
          return null;
        }
      }}
    </MediaQuery>
  </div>
)

export default Footer