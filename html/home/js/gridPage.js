import React from 'react';
import { Text, View, FlatList } from 'react-native'

import API from '../../utils/apiMap'
import { connect} from 'react-redux';

import { getNewData } from '../action' 

class GridPage extends React.Component {
    constructor(props) {
        super(props)
        
        const { getNewData, navigation } = this.props
        const {key} = navigation.state.params
        switch (key){
            case "get": getNewData(API.homeGrid.get);break
            case "borrow": getNewData(API.homeGrid.borrow);break
            case "return": getNewData(API.homeGrid.borrow);break
            case "change": getNewData(API.homeGrid.borrow);break
            case "repiar": getNewData(API.homeGrid.borrow);break
            case "deal": getNewData(API.homeGrid.borrow);break
            case "search": getNewData(API.homeGrid.borrow);break
            case "mine": getNewData(API.homeGrid.borrow);break
        }
		// getNewData(API.zichan_list)
		// getNewData(API.zichan_list_tmp)
    }
    render() {
        const {rows} = this.props;
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
								{/* <Text style={{fontSize:15,flex:1,color:"blue"}} onPress={()=>this.props.navigation.navigate("Apply")}>申请领用</Text> */}
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
export default GridPageContainer = connect(
    (state)=>({
		rows: state.gridReducer.rows
	}),
	(dispatch)=>({
		getNewData: (url,params) => {dispatch(getNewData(url,params))}
	})
)(GridPage)