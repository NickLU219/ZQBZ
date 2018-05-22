import React from 'react';
import { StyleSheet, Text, Image, View, Platform } from 'react-native';
import {Toast} from 'antd-mobile'
import MainTabbar from '../js/MainTabbar'
// import HomeView from '../../home/js/home'
import LoginPage from '../js/login'
import { connect } from 'react-redux'
// import {DeviceId, BundleId,DeviceName} from '../../utils/devInfo'

class InitPage extends React.Component {
    constructor(props){
		super(props);
		const {login,userinfo,token} = this.props
		// alert(DeviceName)
		this.state = (
			{
				login: login,
				token: token,
				userinfo: userinfo
			}
		)
	}
	shouldComponentUpdate(next) {

		// Toast.hide()
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
