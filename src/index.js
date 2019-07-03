import React, { useReducer } from 'react';

import SceneComponent from './scene-component';
//import { reducer, click } from './click-reducer';

const ContainerComponent = () => {
  //const [clicks, dispatch] = useReducer(reducer, reducer());
  return <SceneComponent
    //clicks={ clicks }
    //onClick={() => dispatch(click())}
  />
}

export default ContainerComponent
