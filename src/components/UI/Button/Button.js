import React from 'react';

const button = (props) => (
  <button
    disabled={props.disabled}
    className={`btn btn-${props.clazz}`}
    onClick={props.clicked}>{props.children}</button>
);

export default button;
