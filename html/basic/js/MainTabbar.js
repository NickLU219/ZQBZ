import React from 'react';
import { StyleSheet, Text, Image, View } from 'react-native';
import { TabBar } from 'antd-mobile';

import HomePage from '../../home/js'
import MinePage from '../../mine/js'
import SearchPage from '../../search/js'
import MessagePage from '../../message/js'

import {TabNavigator, TabBarBottom} from 'react-navigation'

class MainTabbar extends React.Component {
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

class TabBarItem extends React.Component {  
  
    render() {  
        return(  
            <Image source={ this.props.focused ? this.props.selectedImage : this.props.normalImage }  
                style={ { tintColor:this.props.tintColor,width:25,height:25 } }  
            />  
        )  
    }  
      
} 
export default TabNavigator(
	{  
		HomePagee: {
			screen: HomePage, 
			navigationOptions: { 
				tabBarOnPress:(obj)=>{
					// console.log(obj);
		
					obj.jumpToIndex(obj.scene.index)
				}, 
				tabBarLabel: '首页',  
				tabBarIcon:({focused,tintColor}) => (  
					<TabBarItem  
					  tintColor={tintColor}  
					  focused={focused}  
					  normalImage={require('../img/home.png')}  
					  selectedImage={require('../img/home_select.png')}  
					/>  
				)   
			}
		},  
		MessagePagee: {
			screen: MessagePage, 
			navigationOptions: {  
				tabBarOnPress:(obj)=>{
					// console.log(obj);
		
					obj.jumpToIndex(obj.scene.index)
				},
				tabBarLabel: '周期查询',  
				tabBarIcon:({focused,tintColor}) => (  
					<TabBarItem  
					  tintColor={tintColor}  
					  focused={focused}  
					  normalImage={require('../img/zichan.png')}  
					  selectedImage={require('../img/zichan_select.png')}  
					/>  
				)     
			}
		},  
		SearchPagee: {
			screen: SearchPage, 
			navigationOptions: {  
				tabBarOnPress:(obj)=>{
					// console.log(obj);
		
					obj.jumpToIndex(obj.scene.index)
				},
				tabBarLabel: '资产查询',  
				tabBarIcon:({focused,tintColor}) => (  
					<TabBarItem  
					  tintColor={tintColor}  
					  focused={focused}  
					  normalImage={require('../img/Inquire.png')}  
					  selectedImage={require('../img/Inquire_select.png')}  
					/>  
				) 
			}
		}, 
		MinePagee: {
			screen: MinePage, 
			navigationOptions: {  
				tabBarOnPress:(obj)=>{
					// console.log(obj);
		
					obj.jumpToIndex(obj.scene.index)
				},
				tabBarLabel: '我的',  
				tabBarIcon:({focused,tintColor}) => (  
					<TabBarItem  
					  tintColor={tintColor}  
					  focused={focused}  
					  normalImage={require('../img/mine.png')}  
					  selectedImage={require('../img/mine_select.png')}  
					/>  
				)  
			}
		}, 
	}, 
	{  
		
		tabBarComponent:TabBarBottom,
		tabBarPosition: 'bottom',  
		// lazy: true, // 是否懒加载  
		initialRouteName: 'HomePagee', 
		swipeEnabled: false,
		// backBehavior: "none", 
		tabBarOptions: {  
			showIcon: true,  
			pressOpacity: 0.8,  
			labelStyle: {  
				fontSize: 11,  
				paddingVertical: 0,  
				marginTop: -4  
			},  
			iconStyle: {  
				marginTop: -3  
			},  
		}  
	}
)