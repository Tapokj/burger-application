import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../Navigation/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auuxz';
import './SideDrawer.css';

const sideDrawer = (props) => {
  let attachedClass = ['side-drawer', 'close'].join(' ')

  if (props.open) {
    attachedClass = ['side-drawer', 'open'].join(' ')
  }
  // ...
  return (
    <Aux>
     <Backdrop show={props.open} clicked={props.closed}/>
      <div className={attachedClass}>
        <Logo height='11%'/>
        <nav>
          <NavigationItems isAuthenticated={props.isAuth}/>
        </nav>
      </div>
    </Aux>
  );
}

export default sideDrawer;
