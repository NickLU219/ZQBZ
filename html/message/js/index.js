'use strict'; 
import React from 'react'; 
import {  
	StyleSheet,  
	Text,  
	View,  
	ScrollView,
	SafeAreaView,
	Image,
	FlatList
} from'react-native';  

import { StackNavigator } from 'react-navigation';
import { List, SearchBar } from 'antd-mobile'

import {connect} from 'react-redux'
import {getData} from '../action'
import API from '../../utils/apiMap';

// const Item = List.Item;
// const Brief = Item.Brief;

class MessagePage extends React.Component {  
	constructor(props) {
		super(props)
		const {getData, token,userinfo} = this.props
		console.log(props)
		getData(API.zichan_life_list,{token, aliActDwId:userinfo.odDwId})

	}
	state = {
		aiName: '',
	};

	onChange = (aiName) => {
		this.setState({ aiName });
	}

	clear = () => {
		this.setState({ aiName: '' });
	}
	getNewDataWithSearch = (value) => {
		const { getData,userinfo,token } = this.props
		console.log(this.state.aiName)
		getData(API.zichan_life_list, {token,aliActDwId:userinfo.odDwId, aiName:this.state.aiName})
	}
	render() {  
		const {rows} = this.props
		return (  
			<View >
				<SearchBar
				value={this.state.aiName}
				placeholder="搜索"
				onSubmit={this.getNewDataWithSearch}
				onCancel={this.clear}
				onChange={this.onChange}
				// showCancelButton
				/>
				<FlatList
				
				ListEmptyComponent={<Text>抱歉 暂无数据</Text>}
				// ListHeaderComponent={()=> (<View style={{height:0, backgroundColor:"#e0e0e0"}}></View>)}
				// ListHeaderComponent= {()=> <Text style={[styles.txt,{backgroundColor:'black'}]}>这是头部</Text>}
				style={{backgroundColor: "#e0e0e0",height:"100%"}}
				automaticallyAdjustContentInsets={false}
				contentContainerStyle={{paddingBottom: 100}}
				ItemSeparatorComponent={()=>(<View style={{height:8, backgroundColor:"#e0e0e0"}}></View>)}
				data={rows}
				renderItem=
				{ ({item}) => (
						<View style={{flex:1,flexDirection:"column", backgroundColor:"white"}}>
							<View style={{flex:1, flexDirection:"row"}}>
								<Text style={{marginLeft:10,marginTop:5, textAlign:"left", flex:2}}>资产名称</Text>
								<Text style={{marginLeft:10,marginTop:5, textAlign:"left", flex:3}}>{item.aiName}</Text>								
							</View>
							<View style={{flex:1, flexDirection:"row"}}>
								<Text style={{marginLeft:10,marginTop:5, textAlign:"left", flex:2}}>操作类型</Text>
								<Text style={{marginLeft:10,marginTop:5, textAlign:"left", flex:3}}>{item.aliActType}</Text>								
							</View>
							<View style={{flex:1, flexDirection:"row"}}>
								<Text style={{marginLeft:10,marginTop:5, textAlign:"left", flex:2}}>操作部门</Text>
								<Text style={{marginLeft:10,marginTop:5, textAlign:"left", flex:3}}>{item.aliActDeptName}</Text>								
							</View>
							<View style={{flex:1, flexDirection:"row"}}>
								<Text style={{marginLeft:10,marginTop:5, textAlign:"left", flex:2}}>操作单位</Text>
								<Text style={{marginLeft:10,marginTop:5, textAlign:"left", flex:3}}>{item.aliActDwName}</Text>								
							</View>
							<View style={{flex:1, flexDirection:"row"}}>
								<Text style={{marginLeft:10,marginTop:5, textAlign:"left", flex:2}}>操作人</Text>
								<Text style={{marginLeft:10,marginTop:5, textAlign:"left", flex:3}}>{item.aliActPersonName}</Text>								
							</View>
							<View style={{flex:1, flexDirection:"row"}}>
								<Text style={{marginLeft:10,marginTop:5, textAlign:"left", flex:2}}>操作时间</Text>
								<Text style={{marginLeft:10,marginTop:5, textAlign:"left", flex:3}}>{item.aliActTime}</Text>								
							</View>
							<View style={{flex:1, flexDirection:"row"}}>
								<Text style={{marginLeft:10,marginTop:5, textAlign:"left", flex:2}}>操作内容</Text>
								<Text style={{marginLeft:10,marginTop:5, textAlign:"left", flex:3}}>{item.aliActDescription}</Text>								
							</View>
						</View>
				)}
				
				/>
			</View>
		);  
	}  
}  


const MessagePageContainer =  connect(
	(state) => ({
		rows: state.messageReducer.rows,
		token: state.homeReducer.token,
		userinfo: state.homeReducer.userinfo
	}),
	dispatch => ({
		getData: (url, params) => dispatch(getData(url, params))
	})
)(MessagePage)

export default StackNavigator(
	{
		Home: { 
			screen: MessagePageContainer,
			navigationOptions:{
				headerTitle:'资产动态',
				headerBackTitle:null,
			} 
		},
	},
	{

	}
)