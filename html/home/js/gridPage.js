import React from 'react';
import { Text, View, FlatList } from 'react-native'

import API from '../../utils/apiMap'
import { connect} from 'react-redux';

import { getNewData } from '../action' 


class GridPage extends React.Component {
    constructor(props) {
        super(props)
        
        const { getNewData, navigation, userinfo, token } = this.props
        // console.log(userinfo)
        const {key} = navigation.state.params
        // console.log("key", key)
        // let med = ()=>{}
        switch (key){
            case "Get": {getNewData(API.homeGrid.get,{aiUseDw: userinfo.odDwId,token:token});};break
            // case "borrow": getNewData(API.homeGrid.borrow);break
            case "Return": getNewData(API.homeGrid.borrow,{aiUseDw: userinfo.odDwId,token:token});break
            case "Change": {getNewData(API.homeGrid.change,{aiUseDw: userinfo.odDwId,token:token});};break
            case "Repiar": {getNewData(API.homeGrid.repiar,{aiUseDw: userinfo.odDwId,token:token});};break
            case "Deal": {getNewData(API.homeGrid.deal,{aiUseDw: userinfo.odDwId,token:token});};break
            // case "Search": {getNewData(API.homeGrid.search);}
            // case "mine": {getNewData(API.homeGrid.borrow);}
        }
    }
    shouldComponentUpdate() {
        console.log("shouldComponentUpdate")
        return true
    }
    button = (key,item)=> {switch(key) {
        case "Get": return <Text style={{fontSize:15,flex:1,color:"blue"}} onPress={()=>this.props.navigation.navigate("Apply", {dept:item.aiUseDept,user:item.aiUsePerson})}>申请领用</Text>
        case "Repiar": return <Text style={{fontSize:15,flex:1,color:"blue"}} onPress={()=>this.props.navigation.navigate("Fix", {dept:item.aiUseDept,user:item.aiUsePerson})}>资产维修</Text>
        case "Deal": return <Text style={{fontSize:15,flex:1,color:"blue"}} onPress={()=>this.props.navigation.navigate("Scrap", {dept:item.aiUseDept,user:item.aiUsePerson})}>资产报废</Text>    
        case "Return": return <Text style={{fontSize:15,flex:1,color:"blue"}} onPress={()=>this.props.navigation.navigate("Scrap", {dept:item.aiUseDept,user:item.aiUsePerson})}>资产报废</Text>    
        case "Change": return <Text style={{fontSize:15,flex:1,color:"blue"}} onPress={()=>this.props.navigation.navigate("Scrap", {dept:item.aiUseDept,user:item.aiUsePerson})}>资产报废</Text>    
                
    }}
    render() {
        const {rows, navigation} = this.props;
        const {key} = navigation.state.params
        console.log("kkey", key)
        
        return (
			<FlatList
			style={{backgroundColor: "#e0e0e0"}}
			ItemSeparatorComponent={()=>(<View style={{height:8, backgroundColor:"#e0e0e0"}}></View>)}
			data={rows}
			renderItem={
				({item}) => (
						<View style={{flex:1,flexDirection:"column", backgroundColor:"white"}}>
							<View style={{height:30,flex:1,flexDirection:"row",alignItems:"center"}}>
								<Text style={{fontSize:15,flex:5,color:"black",marginLeft:20}}>资产编号：{item.aiCode}</Text>
								{/* <Text style={{fontSize:15,flex:1,color:"blue"}} onPress={()=>this.props.navigation.navigate("Apply", {dept:item.aiUseDept,user:item.aiUsePerson})}>申请领用</Text> */}
                                {this.button(key, item)}
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
									{/* <Text style={{flex:4}} onPress={()=>{}}>领用记录</Text> */}
								</View>
							</View>
						</View>
				)}
			/>
		);
    }
}
export default GridPageContainer = connect(
    (state)=>({
        rows: state.gridReducer.rows,
        userinfo : state.homeReducer.userinfo,
        token: state.homeReducer.token
	}),
	(dispatch)=>({
		getNewData: (url,params) => {dispatch(getNewData(url,params))}
	})
)(GridPage)

