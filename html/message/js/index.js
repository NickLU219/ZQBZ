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

import { List, SearchBar, Toast } from 'antd-mobile'
import {StackNavigator} from 'react-navigation'
import {connect} from 'react-redux'
import {getData} from '../action'
import API from '../../utils/apiMap';


class MessagePage extends React.Component {  
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
		const {getData, token,userinfo} = this.props
		// console.log(props)
		getData(API.zichan_life_list,{token, aliActDwId:userinfo.odDwId, start: 1, end: 11})
	}

	onChange = (aiName) => {
		this.setState({ aiName });
	}

	clear = () => {
		this.setState({ aiName: '' });

		const {getData, token,userinfo} = this.props
		// console.log(props)
		getData(API.zichan_life_list,{token, aliActDwId:userinfo.odDwId, start: 1, end: 11})
	}
	getNewDataWithSearch = (value) => {
		const { getData,userinfo,token } = this.props
		console.log(this.state.aiName)
		getData(API.zichan_life_list, {token,aliActDwId:userinfo.odDwId, aiName:this.state.aiName, start: 1, end: 11})
	}
	_onRefresh= () => {
		this.setState({
			refreshing: true,
			page:1
		})
		const { getData,userinfo,token } = this.props
		getData(API.zichan_life_list, {token,aliActDwId:userinfo.odDwId, aiName:this.state.aiName,start: 1, end: 11})
	}
	_onEndReached= () => {
		const { getData,userinfo,token } = this.props
		if (this.state.page<= this.state.maxPage)
			getData(API.zichan_life_list, {token,aliActDwId:userinfo.odDwId, aiName:this.state.aiName,start: 1+10*(this.state.page), end: 11+10*(this.state.page)})
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
		// this.setState({refreshing:false})
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
				onRefresh={()=> {this._onRefresh()}}
				refreshing={this.state.refreshing}
				onEndReachedThreshold={0.1}
				onEndReached={(v) => {this._onEndReached()}}
				ListEmptyComponent={<View style={{width: "100%", height: "100%", alignItems: "center", justifyContent: "center"}}>
										<Text>暂无数据</Text>
									</View>}
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


const MessagePageContainer = connect(
	(state) => ({
		total: state.messageReducer.total,
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
        Message: { 
			screen: MessagePageContainer,
			navigationOptions:{
				headerTitle:'周期查询',
				headerBackTitle:null,
			} 
		},
	},
	{
        initialRouteName: 'Message',
		mode: "card",
		headerMode: 'screen',
		headerBackTitle: "返回"
	}
)