import React from 'react';
import { StyleSheet, Text, Image, View } from 'react-native';
import { TabBar } from 'antd-mobile';

import HomePage from '../../home/js'
import MinePage from '../../mine/js'
import SearchPage from '../../search/js'
import MessagePage from '../../message/js'

export default class MainTabbar extends React.Component {
    constructor(props){
		super(props);
		this.state = {
			selectedTab: "home",
		}
	}

	render() {
		return (
			<TabBar 
				unselectedTintColor="#949494"
				tintColor="#33A3F4"
				barTintColor="white">
				<TabBar.Item
					key="home"
                    title="首页"
                    icon={require("../img/home.png")}
					selectedIcon={require("../img/home_select.png")}
					selected={this.state.selectedTab === "home"}
					onPress={() => {
						this.setState({
						  selectedTab: 'home',
						});
					}}>
					<HomePage/>
				</TabBar.Item>
				<TabBar.Item
					key="message"
					title="资产动态"
					icon={require("../img/zichan.png")}
					selectedIcon={require("../img/zichan_select.png")}
					selected={this.state.selectedTab === "message"}
					onPress={() => {
						this.setState({
						  selectedTab: 'message',
						});
					}}>
					<MessagePage/>
				</TabBar.Item>
				<TabBar.Item
					key="search"
					title="资产查询"
					icon={require("../img/Inquire.png")}
					selectedIcon={require("../img/Inquire_select.png")}
					selected={this.state.selectedTab === "search"}
					onPress={() => {
						this.setState({
						  selectedTab: 'search',
						});
					}}>
					<SearchPage />
				</TabBar.Item>
				<TabBar.Item
					key="mine"
					title="我的"
					icon={require("../img/mine.png")}
					selectedIcon={require("../img/mine_select.png")}
					selected={this.state.selectedTab === "mine"}
					onPress={() => {
						this.setState({
						  	selectedTab: 'mine',
						});
					}}>
					<MinePage/>
				</TabBar.Item>
			</TabBar> 
		);
	}
}