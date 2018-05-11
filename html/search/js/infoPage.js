import React from 'react';
import { View , Text, ScrollView} from 'react-native';
import { Tabs, List, PickerView } from 'antd-mobile'
import API from '../../utils/apiMap'
import { connect} from 'react-redux'

import { getInfo, getInfoList } from '../action' 

import {zichanMap} from '../../utils/zichanMap'
class InfoPage  extends React.Component {
    constructor(props) {
        super(props)
        const {key} = this.props.navigation.state.params
        const { getInfo, token }= this.props
        // console.log(this.props.navigation)
        getInfo(API.zichan_info.zichan_basic_info, {aiId: key, token})
        this.otherThing= {
            updateInfo :[],
            title: "基本信息"
        }
    }
    tabs = [
        { title: '基本信息' },
        { title: '领用记录' },
        { title: '维修信息' },
        { title: '变更信息' },
        { title: '转让信息' },
    ]
    getOtherInfo = (v)=> {
        const {key} = this.props.navigation.state.params
        const { getInfo, getInfoList, token }= this.props
        console.log(v.title)
        switch (v.title) {
            case "基本信息": {this.otherThing.title="基本信息";getInfo(API.zichan_info.zichan_basic_info, {aiId: key, token});break;}
            case "领用记录": {this.otherThing.title=title="领用记录";getInfoList(API.zichan_info.zichan_get_list, {aiId: key, token});break;}
            case "维修信息": {this.otherThing.title=title="维修信息";getInfoList(API.zichan_info.zichan_fix_list, {aiId: key, token});break;}
            case "变更信息": {this.otherThing.title=title="变更信息";getInfoList(API.zichan_info.zichan_change_list, {aiId: key, token});break;}
            case "转让信息": {this.otherThing.title=title="转让信息";getInfoList(API.zichan_info.zichan_makeover_list, {aiId: key, token});break;}
        }
    }
    shouldComponentUpdate(next) {
        console.log("infopage update",next)
        if (this.otherThing.title === "基本信息") {
            this.otherThing.updateInfo= next.data
            return true
        } else {
            this.otherThing.updateInfo= next.info
            return true
        }
        
    }
    render() {
        const tmpData = this.otherThing.updateInfo
        
        console.log("tmpData",tmpData.length,tmpData)
        
        renderGet = (tmpData) =>{
            let pages = []
            for(let i = 0; i < tmpData.length; i++){
                pages.push(<View style={{height:8,backgroundColor:"#ddd"}}></View>)
                for (k in tmpData[0]){                
                    if (k.indexOf('Code')>-1 || k.indexOf('Id')>-1 || k == "aiGetType" || k=="aiPlace" || k =="aiUseState"
                        || k == "aiFinKm" || k == "aiUseDw" || k == "deleted" || k =="aiRfidId"|| k =="aciChangePerson")
                        continue
                    else 
                        pages.push(
                            <View style={{flex:1, flexDirection: "row"}}>
                            <Text style={{fontSize:15, marginLeft:10,fontWeight:"bold",flex:5}}>{zichanMap[k]} </Text>
                            <Text style={{marginLeft: 100,fontWeight:"normal",flex:8}}>{tmpData[0][k] == null ? "无":tmpData[0][k]}</Text>
                            </View>
                        )
                }
            }
            return pages
        }
        return <Tabs tabs={this.tabs}
                    initalPage={'0'}
                    onChange={this.getOtherInfo}
                >
                    <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: "100%", backgroundColor: '#fff' }}>
                        <ScrollView style={{width: "100%", height: "100%"}}>
                        {renderGet(tmpData).map(
                            (d)=> d
                        )}
                        </ScrollView>
                    </View>
                    <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: "100%", backgroundColor: '#fff' }}>
                        <ScrollView style={{width: "100%", height: "100%"}}>
                        {renderGet(tmpData).map(
                            (d)=> d
                        )}
                        </ScrollView>
                    </View>
                    <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: "100%", backgroundColor: '#fff' }}>
                        <ScrollView style={{width: "100%", height: "100%"}}>
                        {renderGet(tmpData).map(
                            (d)=> d
                        )}
                        </ScrollView>
                    </View>
                    <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: "100%", backgroundColor: '#fff' }}>
                        <ScrollView style={{width: "100%", height: "100%"}}>
                        {renderGet(tmpData).map(
                            (d)=> d
                        )}
                        </ScrollView>
                    </View>
                    <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: "100%", backgroundColor: '#fff' }}>
                        <ScrollView style={{width: "100%", height: "100%"}}>
                        {renderGet(tmpData).map(
                            (d)=> d
                        )}
                        </ScrollView>
                    </View>
                </Tabs>
    }
}

export default connect(
    (state)=> ({
        token: state.searchReducer.token,
        data: state.searchReducer.data,
        info: state.searchReducer.info
    }),
    (dispatch)=>({
        getInfo: (url,params) => {dispatch(getInfo(url,params))},
        getInfoList: (url,params) => {dispatch(getInfoList(url,params))}
	})
)(InfoPage)