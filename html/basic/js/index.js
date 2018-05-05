import React from 'react';
import { StyleSheet, Text, Image, View } from 'react-native';

import MainTabbar from '../js/MainTabbar'
import LoginPage from '../js/login'

export default class InitPage extends React.Component {
    constructor(props){
		super(props);
		this.state = {
			login: false
		}
	}

	render() {
		console.log("aaa")
		if (this.state.login){

		console.log("bbb")
			return (
				<MainTabbar/>
			);
		}
		else {

		console.log("ccc")
			return (
				<LoginPage/>
			)
		}
	}
}