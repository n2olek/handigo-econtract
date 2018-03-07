import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap/scss/bootstrap.scss'
// import 'themes/styles/bases/reset';
// import 'themes/styles/bases/scaffolding';
import 'themes/styles/layouts/main';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();