import React from 'react';
import ReactDOM from 'react-dom';
import EntryPoint from './EntryPoint/EntryPoint';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <EntryPoint />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.register();
