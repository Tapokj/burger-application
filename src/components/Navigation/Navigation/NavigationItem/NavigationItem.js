import React       from 'react';
import { NavLink } from 'react-router-dom';

import './NavigationItem.css';

const navigationItem = (props) => (
  <li className='navigation-item'>
    <NavLink activeClassName='active' exact={props.exact} to={props.link}>{props.children}</NavLink>
  </li>
)

export default navigationItem;
