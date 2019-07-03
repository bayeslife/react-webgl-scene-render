import React from 'react';
import { render} from 'react-dom';

import MyComponent from '../../src';

const App = () => (
    <div>
        <h1>react-webgl-scene-render Demo</h1>
            <MyComponent param="Sam"/>
    </div>
);
render(<App />, document.querySelector('#demo'));

