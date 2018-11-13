import React from 'react';

import './Modal.css';
import Aux from '../../../hoc/Auuxz';
import Backdrop from '../Backdrop/Backdrop';

const Modal = (props) => (
  <Aux>
    <Backdrop clicked={props.modalClose} show={props.show}/>
    <div
        className='Modal'
        style={{
            transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: props.show ? '1' : '0'
        }}>
        {props.children}
    </div>
  </Aux>
)


export default Modal;
