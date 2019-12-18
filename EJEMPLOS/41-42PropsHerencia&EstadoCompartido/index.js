import React from 'react';
import ReactDOM from 'react-dom';
import reduxThunk from 'redux-thunk';

import '../src/css/index.css';
import '../src/css/iconos.css';
import App from './components/App';

import { createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux'

import reducers from './reducers'

const store = createStore(
  reducers, // Reducers
	{}, // Estado inicial
	applyMiddleware(reduxThunk)
  )

ReactDOM.render(

<Provider store={store}>
  <App />
</Provider>,
document.getElementById('root'));

