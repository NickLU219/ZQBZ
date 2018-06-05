import React from 'react';
import { View , Text, ScrollView} from 'react-native';
import { Tabs, List, PickerView, Button } from 'antd-mobile'
import API from '../../utils/apiMap'
import { connect} from 'react-redux'


import { getInfo, getInfoList, getPZ } from '../action' 

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
        // console.log(v.title)
        switch (v.title) {
            case "基本信息": {this.otherThing.title="基本信息";getInfo(API.zichan_info.zichan_basic_info, {aiId: key, token});break;}
            case "领用记录": {this.otherThing.title="领用记录";getInfoList(API.zichan_info.zichan_get_list, {aiId: key, token});break;}
            case "维修信息": {this.otherThing.title="维修信息";getInfoList(API.zichan_info.zichan_fix_list, {aiId: key, token});break;}
            case "变更信息": {this.otherThing.title="变更信息";getInfoList(API.zichan_info.zichan_change_list, {aiId: key, token});break;}
            case "转让信息": {this.otherThing.title="转让信息";getInfoList(API.zichan_info.zichan_makeover_list, {aiId: key, token});break;}
        }
    }
    dealArray(arr,index) {
        const tmpArr = [...arr]
        // let curindex = index
            for(let i=index+1;i<arr.length;i++){
                if (arr[0].aliId === arr[i].aliId)
                    tmpArr.splice(i,i+1)
                    tmpArr[0].fileId+=","+arr[i].aliId
                    console.log(tmpArr)
            }
        index++
        if(index < arr.length){
            return this.dealArray(tmpArr, index)
        }
        else {
            console.log("else return")
            return tmpArr
        }
    }
    shouldComponentUpdate(next) {
        // console.log("infopage update",next)
        if (this.otherThing.title === "基本信息") {
            this.otherThing.updateInfo= next.data
            return true
        } else {
            //Todo: 整合id相同的记录 
            console.log("next.info",next.info)
            let data = next.info
            // console.log("dealArr",this.dealArray(data,0))
            this.otherThing.updateInfo= this.dealArray(data,0)
            return true
        }
        
    }
    showPhoto = (fileId) => {
        const {getPZ} = this.props
        this.props.navigation.navigate("Browser", {file_id:fileId})
        // getPZ(API.lesFile, {cmd:"getinfo", file_id:fileId})

    }
    render() {
        const tmpData = this.otherThing.updateInfo
        
        console.log("tmpData",tmpData.length,tmpData)
        
        renderGet = (tmpData) =>{
            let pages = []
            let index = 0
            if (tmpData.length == 0){
                pages.push(
                    <View style={{width: "100%", height: 300, alignItems: "center", justifyContent: "center"}}>
                        <Text>暂无数据</Text>
                    </View>
                )
            }
            else {
                for(let i = 0; i < tmpData.length; i++){
                    pages.push(<View style={{height:4,backgroundColor:"#ddd"}}></View>)
                    for (k in tmpData[i]){                
                        if (k.indexOf('Code')>-1 || k.indexOf('Id')>-1 || k == "aiGetType" || k=="aiPlace" || k =="aiUseState"
                            || k == "aiFinKm" || k == "aiUseDw" || k == "deleted" || k =="aiRfidId"|| k =="aciChangePerson"
                            || k == "amoiEmp" || k == "amoiDept" || k == "amoiDate" || k == "agiGetDept" || k == "agiUsePersonBefore"
                            || k == "agiGetPerson" || k == "agiUseDeptBefore")
                            continue
                        else{
                            if (index % 2 == 0)
                                pages.push(
                                    <View style={{flex:1, flexDirection: "row", backgroundColor: "#eee"}}> 
                                        <Text style={{fontSize:15, marginLeft:10,fontWeight:"bold",flex:5, marginTop:3}}>{zichanMap[k]} </Text>
                                        <Text style={{marginLeft: 100,fontWeight:"normal",flex:7, marginTop:3}}>{tmpData[0][k] == null ? "无":tmpData[0][k]}</Text>
                                    </View>
                                )
                            else 
                                pages.push(
                                    <View style={{flex:1, flexDirection: "row", }}> 
                                        <Text style={{fontSize:15, marginLeft:10,fontWeight:"bold",flex:5,marginTop:3}}>{zichanMap[k]} </Text>
                                        <Text style={{marginLeft: 100,fontWeight:"normal",flex:7, marginTop:3}}>{tmpData[0][k] == null ? "无":tmpData[0][k]}</Text>
                                    </View>
                                )
                        }
                        index++
                    }
                    if(tmpData[i]["fileId"] != null) pages.push(
                                                        <View style={{alignItems: "center", justifyContent: "center"}}>
                                                            <Button size="small" style={{marginLeft: 30, marginRight: 30}}  type="primary" onClick={()=>this.showPhoto(tmpData[i]["fileId"])}>查看凭证</Button>
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
                        {renderGet(tmpData).map( (d)=> d )}
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
        path : state.searchReducer.path,
        token: state.searchReducer.token,
        data: state.searchReducer.data,
        info: state.searchReducer.info
    }),
    (dispatch)=>({
        getInfo: (url,params) => {dispatch(getInfo(url,params))},
        getInfoList: (url,params) => {dispatch(getInfoList(url,params))},
        getPZ: (url, params) => dispatch(getPZ(url, params))
	})
)(InfoPage)