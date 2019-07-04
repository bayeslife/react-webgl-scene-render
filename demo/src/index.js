import React from 'react';
import { render} from 'react-dom';

import CourtComponent from '../../src';

const App = () => (
    <div>
        <h1>react-webgl-scene-render Demo</h1>
        <CourtComponent 
            //imageHeight="224" 
            //imageWidth="224"
        />
    </div>
);
render(<App />, document.querySelector('#demo'));

