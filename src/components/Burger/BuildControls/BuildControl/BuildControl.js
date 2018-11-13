import React from 'react';

import './BuildControl.css';

const buildControl = (props) => (
  <div className='build-control'>
    <div className='label'>{props.label}</div>
    <button disabled={props.disabled} onClick={props.removed} className='btn less'>Less</button>
    <button onClick={props.added} className='more'>More</button>
  </div>
)

export default buildControl;
