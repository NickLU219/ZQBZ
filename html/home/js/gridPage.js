import React from 'react';
import { Text, View, FlatList, TouchableHighlight } from 'react-native'
import {SearchBar, WhiteSpace } from 'antd-mobile'
import API from '../../utils/apiMap'
import { connect} from 'react-redux';

import { getNewData,  updateGridPage, didUpdateGridPage } from '../action' 


class GridPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: ""
        }
        
        const { getNewData, navigation, userinfo, token } = this.props
        const {key} = navigation.state.params
        console.log("key", key)
        switch (key){
            case "Get": {getNewData(API.homeGrid.get,{aiUseDw: userinfo.odDwId,token:token});};break
            case "Return": getNewData(API.homeGrid.return,{aiUseDw: userinfo.odDwId,token:token});break
            case "Change": {getNewData(API.homeGrid.change,{aiUseDw: userinfo.odDwId,token:token});};break
            case "Repiar": {getNewData(API.homeGrid.repiar,{aiUseDw: userinfo.odDwId,token:token});};break
            case "Deal": {getNewData(API.homeGrid.deal,{aiUseDw: userinfo.odDwId,token:token});};break
            case "Search": {getNewData(API.homeGrid.search,{aiUseDw: userinfo.odDwId,token:token, aiUsePersonId:userinfo.oeId});}
            case "Mine": {getNewData(API.homeGrid.mine,{aiUseDw: userinfo.odDwId,token:token, aiUsePersonId:userinfo.oeId});};break
        }
    }
    button = (key,item)=> {switch(key) {
        case "Get": return <Text style={{fontSize:17,flex:5,color:"blue"}} onPress={()=>this.props.navigation.navigate("Apply", {item})}>申请领用</Text>
        case "Repiar": return <Text style={{fontSize:17,flex:5,color:"blue"}} onPress={()=>this.props.navigation.navigate("Fix", {item})}>资产维修</Text>
        case "Deal": return <Text style={{fontSize:17,flex:5,color:"blue"}} onPress={()=>this.props.navigation.navigate("Scrap", {item})}>资产报废</Text>    
        case "Return": return <Text style={{fontSize:17,flex:5,color:"blue"}} onPress={()=>this.props.navigation.navigate("Makeover", {item})}>资产转让</Text>    
        case "Change": return <Text style={{fontSize:17,flex:5,color:"blue"}} onPress={()=>this.props.navigation.navigate("ChangeAction", {item})}>资产变更</Text>    
        default: return <View></View>       
    }}
    zicha = (key,item)=> {
        if (key != "Search"){ 
            return 
                    <Text style={{fontSize:15,flex:5,color:"black",marginLeft:20}}>资产编号：{item.aiCode}</Text>
            }
        else
            return <View></View> 
    }
    onChange = (value) => {
        this.setState({ value });
    }

    clear = () => {
        this.setState({ value: '' });
        const { getNewData, navigation, userinfo, token } = this.props
        const {key} = navigation.state.params
        console.log("key", key)
        switch (key){
            case "Get": {getNewData(API.homeGrid.get,{aiUseDw: userinfo.odDwId,token:token});};break
            case "Return": getNewData(API.homeGrid.return,{aiUseDw: userinfo.odDwId,token:token});break
            case "Change": {getNewData(API.homeGrid.change,{aiUseDw: userinfo.odDwId,token:token});};break
            case "Repiar": {getNewData(API.homeGrid.repiar,{aiUseDw: userinfo.odDwId,token:token});};break
            case "Deal": {getNewData(API.homeGrid.deal,{aiUseDw: userinfo.odDwId,token:token});};break
            case "Search": {getNewData(API.homeGrid.search,{aiUseDw: userinfo.odDwId,token:token, aiUsePersonId:userinfo.oeId});}
            case "Mine": {getNewData(API.homeGrid.mine,{aiUseDw: userinfo.odDwId,token:token, aiUsePersonId:userinfo.oeId});};break
        }
    
    }
    submitWithKW=()=>{
        const { getNewData, navigation, userinfo, token } = this.props
        const {key} = navigation.state.params
        switch (key){
            case "Get": {getNewData(API.homeGrid.get,{aiUseDw: userinfo.odDwId,token:token, aiName:this.state.value});};break
            case "Return": getNewData(API.homeGrid.return,{aiUseDw: userinfo.odDwId,token:token, aiName:this.state.value});break
            case "Change": {getNewData(API.homeGrid.change,{aiUseDw: userinfo.odDwId,token:token, aiName:this.state.value});};break
            case "Repiar": {getNewData(API.homeGrid.repiar,{aiUseDw: userinfo.odDwId,token:token, aiName:this.state.value});};break
            case "Deal": {getNewData(API.homeGrid.deal,{aiUseDw: userinfo.odDwId,token:token, aiName:this.state.value});};break
            case "Search": {getNewData(API.homeGrid.search,{aiUseDw: userinfo.odDwId,token:token, aiName:this.state.value, aiUsePersonId:userinfo.oeId});}
            case "Mine": {getNewData(API.homeGrid.mine,{aiUseDw: userinfo.odDwId,token:token, aiName:this.state.value, aiUsePersonId:userinfo.oeId});};break
        }
    }
    componentWillMount() {
        console.log("gridpage componentWillMount")
    }
    shouldComponentUpdate(n) {
        console.log(n)
        if(n.updateGridpage){
            const { getNewData, navigation, userinfo, token, didUpdateGridPage } = this.props
            didUpdateGridPage()
            const {key} = navigation.state.params
            console.log("key", key)
            switch (key){
                case "Get": {getNewData(API.homeGrid.get,{aiUseDw: userinfo.odDwId,token:token});};break
                case "Return": getNewData(API.homeGrid.return,{aiUseDw: userinfo.odDwId,token:token});break
                case "Change": {getNewData(API.homeGrid.change,{aiUseDw: userinfo.odDwId,token:token});};break
                case "Repiar": {getNewData(API.homeGrid.repiar,{aiUseDw: userinfo.odDwId,token:token});};break
                case "Deal": {getNewData(API.homeGrid.deal,{aiUseDw: userinfo.odDwId,token:token});};break
                case "Search": {getNewData(API.homeGrid.search,{aiUseDw: userinfo.odDwId,token:token, aiUsePersonId:userinfo.oeId});}
                case "Mine": {getNewData(API.homeGrid.mine,{aiUseDw: userinfo.odDwId,token:token, aiUsePersonId:userinfo.oeId});};break
            }
        }
        console.log("gridpage shouldComponentUpdate", n)
        return true
    }
    render() {
        const {rows, navigation} = this.props;
        const {key} = navigation.state.params
        // console.log("kkey", key)
        
        return (
            <View>
                <SearchBar
                    value={this.state.value}
                    placeholder="搜索"
                    onSubmit={this.submitWithKW}
                    onCancel={this.clear}
                    onChange={this.onChange}
                    // showCancelButton
				/>
                <FlatList
                ListEmptyComponent={<View style={{width: "100%", height: 300, alignItems: "center", justifyContent: "center", backgroundColor:"#f0f0f0"}}>
                                        <Text>暂无数据</Text>
                                    </View>}
                style={{backgroundColor: "#f0f0f0"}}

				contentContainerStyle={{ paddingBottom: 100 }}
                ItemSeparatorComponent={()=>(<View style={{height:8, backgroundColor:"#e0e0e0"}}></View>)}
                data={rows}
                renderItem={
                    ({item}) => (
                            <View style={{flex:1,flexDirection:"column", backgroundColor:"white"}}>
                                <View style={{height:30,flex:1,flexDirection:"row",alignItems:"center"}}>
                                {/* {this.zicha(key, item)} */}

                    <Text style={{fontSize:15,flex:5,color:"black",marginLeft:20}}>资产编号：{item.aiCode}</Text>
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
                                    </View>
                                </TouchableHighlight>
                                <View style={{borderBottomWidth:0.5,borderBottomColor:"white",flex:1,flexDirection:"row",height:30,backgroundColor:"#f0f0f0",alignItems:"center"}}>
                                    <View style={{flex:1}}></View>
                                    <Text style={{flex:6}}>使用状况：{item.aiUseStateName}</Text>
                                    <Text style={{flex:6}}>位置：{item.aiPlaceName}</Text>
                                    {this.button(key, item)}
                                </View>
                            </View>
                    )}
                />
                </View>
		);
    }
}
export default GridPageContainer = connect(
    (state)=>({
        rows: state.gridReducer.rows,
        userinfo : state.homeReducer.userinfo,
        token: state.homeReducer.token,
        updateGridpage: state.gridReducer.updateGridpage
	}),
	(dispatch)=>({
        getNewData: (url,params) => {dispatch(getNewData(url,params))}, 
        updateGridPage: () => {dispatch(updateGridPage())},
        didUpdateGridPage: () => {dispatch(didUpdateGridPage())}
	})
)(GridPage)

