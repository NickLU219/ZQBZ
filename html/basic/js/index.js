import React from 'react';
import { StyleSheet, Text, Image, View } from 'react-native';

import MainTabbar from '../js/MainTabbar'
import LoginPage from '../js/login'
import { connect } from 'react-redux'

class InitPage extends React.Component {
    constructor(props){
		super(props);
		const {login,userinfo,token} = this.props
		this.state = (
			{
				login: login,
				token: token,
				userinfo: userinfo
			}
		)
	}

	shouldComponentUpdate(next) {
		return true
	}

	render() {
		const {login,userinfo,token} = this.props
		if (login){
			return (
				<MainTabbar/>
			);
		}
		else {
			return (
				<LoginPage/>
			)
		}
	}
}

export default connect(
	(state) => (
		{
			login: state.homeReducer.login,
			userinfo: state.homeReducer.userinfo,
			token: state.homeReducer.token
		}
	)
)(InitPage)