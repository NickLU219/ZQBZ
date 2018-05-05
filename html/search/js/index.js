import React from 'react';
import { View, Text, FlatList, Image, TouchableHighlight, TouchableNativeFeedback, Button } from 'react-native';
import { Icon, WhiteSpace, Card } from 'antd-mobile';
import { StackNavigator } from 'react-navigation';

import ApplyPage from './applyPage'
import API from '../../utils/apiMap'
import { connect} from 'react-redux';

import { getNewData } from '../action' 

class MyList extends React.Component {
	constructor(props) {
		super(props)
		const { getNewData } = this.props
		getNewData(API.zichan_list, {aiUsePersonId: "0001A410000000002JC3"})
		// getNewData(API.zichan_list_tmp)
		
		
	}
	shouldComponentUpdate(next) {
		// console.log("shouldComponentUpdate",next)
		if (next.rows === this.props.rows)
			return false
		else return true
	}
	render() {
		const {rows} = this.props
		return (
			<FlatList
			style={{backgroundColor: "#e0e0e0"}}
			ItemSeparatorComponent={()=>(<View style={{height:8, backgroundColor:"#e0e0e0"}}></View>)}
			data={rows}
			renderItem={
				({item}) => (
						<View style={{flex:1,flexDirection:"column", backgroundColor:"white"}}>
							<View style={{height:30,flex:1,flexDirection:"row",alignItems:"center"}}>
								<Text style={{fontSize:15,flex:4,color:"black",marginLeft:20}}>资产编号：{item.aiCode}</Text>
								<Text style={{fontSize:15,flex:1,color:"blue"}} onPress={()=>this.props.navigation.navigate("Apply")}>申请领用</Text>
							</View>
							<View style={{height:1,backgroundColor:"#eee"}}></View>
							<View style={{ flex:1, flexDirection:"column"}}>
								<View style={{height:30, flex:1, flexDirection:"row",alignItems:"center"}}>
									<View style={{flex:1}}></View>
									<Text style={{flex:6}}>资产名称：<Text>{item.aiName}</Text></Text>
									<Text style={{flex:6}}>管理部门：<Text>{item.aiManageDept}</Text></Text>
								</View>
								<View style={{height:30, flex:1, flexDirection:"row",alignContent:"center"}}>
									<View style={{flex:1}}></View>
									<Text style={{flex:6}}>使用部门：<Text>{item.aiUseDept}</Text></Text>
									<Text style={{flex:6}}>使用人：<Text>{item.aiUsePerson}</Text></Text>
								</View>
								<View style={{flex:1,flexDirection:"row",height:30,backgroundColor:"#f0f0f0",alignItems:"center"}}>
									<View style={{flex:1}}></View>
									<Text style={{flex:10}}>使用状况：{item.aiUseStateName}</Text>
									<Text style={{flex:6}}>位置：{item.aiPlaceName}</Text>
									<Text style={{flex:4}} onPress={()=>{}}>领用记录</Text>
								</View>
							</View>
						</View>
				)}
			/>
		);
	}
}


const MyListContaner = connect(
	(state)=>({
		rows: state.searchReducer.rows
	}),
	(dispatch)=>({
		getNewData: (url,params) => {dispatch(getNewData(url,params))}
	})
)(MyList)


export default StackNavigator(
	{
		Home: { 
			screen: MyListContaner,
			navigationOptions:{
				headerTitle:'资产列表',
				headerBackTitle:null,
				headerRight: <TouchableHighlight >
								<Image source={require('../img/search.png')} 
									style={{ height:25, width:25, marginRight: 15 }}/>
							</TouchableHighlight>
			} 
		},
		Apply: { 
			screen: ApplyPage,
			navigationOptions:{
				headerTitle:'资产领用',
				headerBackTitle:null,
			}
		},
	},
	{
		initialRouteName: 'Home',
		mode: "card",
		headerMode: 'screen',
		headerBackTitle: "返回"
	}
);

