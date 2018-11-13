import React from 'react';

import './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../Navigation/NavigationItems';
import DrawerToggler from '../SideDrawer/DrawerToggler/DrawerToggler';

const toolbar = (props) => {
  return (
    <header className='toolbar'>
      <DrawerToggler clicked={props.drawerToggleClicked}/>
      <Logo height='80%'/>
      <nav>
        <NavigationItems isAuthenticated={props.isAuth}/>
      </nav>
    </header>
  )
}

export default toolbar;
