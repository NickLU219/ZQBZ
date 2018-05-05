import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { TabBar } from 'antd-mobile';

import InitPage from './html/basic/js'

import RootReducer from './allReducers'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

const store = createStore(RootReducer, /* preloadedState, */ 
	composeWithDevTools(applyMiddleware(thunk))
)
  


export default class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<InitPage/>
			</Provider>
		);
	}
}


