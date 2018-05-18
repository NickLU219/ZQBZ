import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, Button, TouchableHighlight, ActivityIndicator } from 'react-native';
import { Icon, WhiteSpace, Card, SearchBar, Toast } from 'antd-mobile';
import { StackNavigator } from 'react-navigation';

// import ApplyPage from './applyPage'
import InfoPage from './infoPage'
import API from '../../utils/apiMap'
import { connect} from 'react-redux'

import { getNewData } from '../action' 

class MyList extends React.Component {
	constructor(props) {
		super(props)
		
		this.state = {
			aiName: '',
			
			refreshing: false,
			page:1,
			maxPage:0
		};
	}
	componentWillMount() {
		const { getNewData,userinfo,token } = this.props
		getNewData(API.zichan_list, {token,aiUseDw:userinfo.odDwId, start: 1, end: 11})
	}

	onChange = (aiName) => {
		this.setState({ aiName });
	}

	clear = () => {
		this.setState({ aiName: '' });
	}
	shouldComponentUpdate(next) {
		// console.log("shouldComponentUpdate",next)
		if (next.rows === this.props.rows)
			return false
		else return true
	}
	getNewDataWithSearch = (value) => {
		const { getNewData,userinfo,token } = this.props
		getNewData(API.zichan_list, {token,aiUseDw:userinfo.odDwId, aiName:this.state.aiName, start: 1, end: 11})
	}
	_onRefresh= () => {
		this.setState({
			refreshing: true,
			page:1
		})
		const { getNewData,userinfo,token } = this.props
		getNewData(API.zichan_list, {token,aiUseDw:userinfo.odDwId, aiName:this.state.aiName, start: 1, end: 11})
	}
	_onEndReached= () => {
		const { getData,userinfo,token } = this.props
		if (this.state.page<= this.state.maxPage)
			getNewData(API.zichan_list, {token,aiUseDw:userinfo.odDwId, aiName:this.state.aiName,start: 1+10*(this.state.page), end: 11+10*(this.state.page)})
		else
			Toast.info("没有更多了",0.5,()=>{},true)
		this.setState({page:this.state.page+1})
	}
	componentWillReceiveProps(next) {
		this.setState({refreshing:false, maxPage: parseInt(next.total/10)})
		console.log(this.state.maxPage, next)
		return true
	}
	render() {
		const {rows} = this.props
		return (
			<View>
				<SearchBar
				value={this.state.aiName}
				placeholder="搜索"
				onSubmit={this.getNewDataWithSearch}
				onCancel={this.clear}
				onChange={this.onChange}
				// showCancelButton
				/>
				<FlatList
				// ListFooterComponent={this.renderFooter}
				onRefresh={()=> {this._onRefresh()}}
				refreshing={this.state.refreshing}
				onEndReachedThreshold={0.1}
				onEndReached={(v) => {this._onEndReached()}}
				ListEmptyComponent={<View style={{width: "100%", height: "100%", alignItems: "center", justifyContent: "center"}}>
										<Text>暂无数据</Text>
									</View>}
				style={{backgroundColor: "#e0e0e0",height:"100%"}}
				automaticallyAdjustContentInsets={false}
				contentContainerStyle={{ paddingBottom: 100 }}
				ItemSeparatorComponent={()=>(<View style={{height:8, backgroundColor:"#e0e0e0"}}></View>)}
				data={rows}
				renderItem={
					({item}) => (
							<View style={{flex:1,flexDirection:"column", backgroundColor:"white", borderRadius: 5, marginLeft:5, marginRight: 5}}>
								<View style={{height:30,flex:1,flexDirection:"row",alignItems:"center"}}>
									<Text style={{fontSize:15,flex:4,color:"black",marginLeft:20}}>资产编号：{item.aiCode}</Text>
									{/* <Text style={{fontSize:15,flex:1,color:"blue"}} onPress={()=>this.props.navigation.navigate("Apply")}>申请领用</Text> */}
								</View>
								<View style={{height:1,backgroundColor:"#eee"}}></View>
								<TouchableHighlight underlayColor="transparent"
									onPress={()=> {this.props.navigation.navigate("Info", {key: item.aiId})}}>
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
											{/* <Text style={{flex:4}} onPress={()=>{}}>领用记录</Text> */}
										</View>
									</View>
								</TouchableHighlight>
							</View>
					)}
				/>
				{/* <View style={{height:40,width:"100%"}}></View> */}
			</View>
		);
	}
}


const MyListContaner = connect(
	(state)=>({
		total: state.searchReducer.total,
		rows: state.searchReducer.rows,
        userinfo : state.homeReducer.userinfo,
        token: state.homeReducer.token
	}),
	(dispatch)=>({
		getNewData: (url,params) => {dispatch(getNewData(url,params))}
	})
)(MyList)


export default StackNavigator(
	{
		Search: { 
			screen: MyListContaner,
			navigationOptions:{
				headerTitle:'资产列表',
				headerBackTitle:null,
			} 
		},
		Info: { 
			screen: InfoPage,
			navigationOptions:{
				headerTitle:'资产信息',
				headerBackTitle:null,
			}
		},
	},
	{
		initialRouteName: 'Search',
		mode: "card",
		headerMode: 'screen',
		headerBackTitle: "返回"
	}
);

