'use strict'; 
import React from 'react'; 
import {  
	StyleSheet,  
	Text,  
	View,  
	ScrollView,
	SafeAreaView,
	Image
} from'react-native';  

import { StackNavigator } from 'react-navigation';
import { List } from 'antd-mobile'

const Item = List.Item;
const Brief = Item.Brief;
class MessagePage extends React.Component {  
	render() {  
		return (  
			<List >
				<SafeAreaView/>
				<Item
				arrow="horizontal"
				thumb={<Image source={require('../img/list09.png')} style={{height: 38, width: 38, marginRight:20}}/>}
				multipleLine
				onClick={() => {}}
				>
					<Text style={{fontSize:15}}>资产到期提醒
					<Image source={require('../img/remind.png')} style={{ height:5, width:5, left: 5, alignSelf:"auto"}}/> 
					</Text>
					<Brief style={{fontSize:10}}>收到新的资产消息提醒，请及时查看</Brief>
				</Item>
				<Item
				arrow="horizontal"
				thumb={<Image source={require('../img/list09.png')} style={{height: 38, width: 38, marginRight:20}}/>}
				multipleLine
				onClick={() => {}}
				>
					<Text style={{fontSize:15}}>资产到期提醒
					<Image source={require('../img/remind.png')} style={{ height:5, width:5, left: 5, alignSelf:"auto"}}/> 
					</Text>
					<Brief style={{fontSize:10}}>收到新的资产消息提醒，请及时查看</Brief>
				</Item>
				<Item
				arrow="horizontal"
				thumb={<Image source={require('../img/list09.png')} style={{height: 38, width: 38, marginRight:20}}/>}
				multipleLine
				onClick={() => {}}
				>
					<Text style={{fontSize:15}}>资产到期提醒
					<Image source={require('../img/remind.png')} style={{ height:5, width:5, left: 5, alignSelf:"auto"}}/> 
					</Text>
					<Brief style={{fontSize:10}}>收到新的资产消息提醒，请及时查看</Brief>
				</Item>
				<Item
				arrow="horizontal"
				thumb={<Image source={require('../img/list09.png')} style={{height: 38, width: 38, marginRight:20}}/>}
				multipleLine
				onClick={() => {}}
				>
					<Text style={{fontSize:15}}>资产到期提醒
					<Image source={require('../img/remind.png')} style={{ height:5, width:5, left: 5, alignSelf:"auto"}}/> 
					</Text>
					<Brief style={{fontSize:10}}>收到新的资产消息提醒，请及时查看</Brief>
				</Item>
				<Item
				arrow="horizontal"
				thumb={<Image source={require('../img/list09.png')} style={{height: 38, width: 38, marginRight:20}}/>}
				multipleLine
				onClick={() => {}}
				>
					<Text style={{fontSize:15}}>资产到期提醒
					<Image source={require('../img/remind.png')} style={{ height:5, width:5, left: 5, alignSelf:"auto"}}/> 
					</Text>
					<Brief style={{fontSize:10}}>收到新的资产消息提醒，请及时查看</Brief>
				</Item>
				<Item
				arrow="horizontal"
				thumb={<Image source={require('../img/list09.png')} style={{height: 38, width: 38, marginRight:20}}/>}
				multipleLine
				onClick={() => {}}
				>
					<Text style={{fontSize:15}}>资产到期提醒
					<Image source={require('../img/remind.png')} style={{ height:5, width:5, left: 5, alignSelf:"auto"}}/> 
					</Text>
					<Brief style={{fontSize:10}}>收到新的资产消息提醒，请及时查看</Brief>
				</Item>
				<Item
				arrow="horizontal"
				thumb={<Image source={require('../img/list09.png')} style={{height: 38, width: 38, marginRight:20}}/>}
				multipleLine
				onClick={() => {}}
				>
					<Text style={{fontSize:15}}>资产到期提醒
					<Image source={require('../img/remind.png')} style={{ height:5, width:5, left: 5, alignSelf:"auto"}}/> 
					</Text>
					<Brief style={{fontSize:10}}>收到新的资产消息提醒，请及时查看</Brief>
				</Item>
			</List>
		);  
	}  
}  
export default StackNavigator(
	{
		Home: { 
			screen: MessagePage,
			navigationOptions:{
				headerTitle:'资产动态',
				headerBackTitle:null,
			} 
		},
	},
	{

	}
)