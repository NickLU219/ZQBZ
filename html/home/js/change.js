import React from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableHighlight } from 'react-native';
import { List, WhiteSpace, InputItem, Picker, Button, Toast } from 'antd-mobile'
import {connect} from 'react-redux'
import { getDeptList, getUserList, getPlaceList, SubmitChange, ClearMsg, uploadFile, getActId, updateGridPage } from '../action'
import API from '../../utils/apiMap'

import Basic from './basic'
class ChangePage extends Basic {
    constructor(props) {
        super(props)
        const {userinfo, token} = this.props
        const item = this.props.navigation.state.params.item
        console.log(item)
        const time = new Date() 
        this.dateString = time.toLocaleDateString().replace(/\//g,"-")+" " +time.getHours()+":"+time.getMinutes()+":"+time.getSeconds()
        
        this.state= {
            ...this.state,
            cols: "1",
            before: "",
            content: [
                {value:"AI_USE_PERSON_ID", label:"人员"},
                {value:"AI_USE_DEPT_ID", label:"部门"},
                {value:"AI_PLACE", label:"位置"}
            ],
            afterContent: [],
            visible: false,
            pickerValue: [],
            aftervisible: false,
            afterpickerValue: [],
            params : {
                token: token, 
                aiId: item.aiId, //资产ID
                aciProperty: "", //变更属性名称
                aciPropertyId: "",  //变更的属性ID ，属性名称对应的ID， 对应关系是ASSESTS_INFO 表
                aciValueBefor: "", //变更前值
                aciValueAfter: "", //变更后值
                aciChangePerson: userinfo.oeCode, //操作人员
                aciChangeTime: this.dateString,
                aciChangePersonName: userinfo.oeName,//操作人员姓名
                aciChangeDept: userinfo.odId
            }
        }

        
    }
    showValue = (v) => {
        console.log("showValue")
        const { getDeptList, getUserList, getPlaceList, token, userinfo } = this.props
        const item = this.props.navigation.state.params.item
        if (v[0] === "AI_USE_PERSON_ID") {
            this.setState({
                before: item.aiUsePerson,
                params: {...this.state.params,aciPropertyId: v[0],aciValueBefor: item.aiUsePerson, aciProperty: "人员"},
                cols: "1"
            })
            getUserList(API.user_list, {odId:userinfo.odId, token})
        }else if (v[0] === "AI_USE_DEPT_ID") {
            this.setState({
                before: item.aiUseDept,
                params: {...this.state.params,aciPropertyId: v[0],aciValueBefor: item.aiUseDept, aciProperty: "部门"},
                cols: "3"
            })
            getDeptList(API.dept_list, {odDwId:userinfo.odDwId, token})
        }else {
            this.setState({
                before: item.aiPlaceName,
                params: {...this.state.params,aciPropertyId: v[0],aciValueBefor: item.aiPlace, aciProperty: "位置"},
                cols: "1"
            })
            getPlaceList(API.place_list, {odDwId:userinfo.odDwId, token})
        }
    }
    submit = () => {
        const {SubmitChange, uploadFile, actId, aliId, userinfo, token} = this.props
        // console.log(this.state.params)
        //测试上传图片
        uploadFile(API.upload_file, {spFile:this.state.images, token, actId, asfUploadPerson:userinfo.oeId,aliId})

        if(this.submitcheck()) 
            SubmitChange(API.doOperation.change,{...this.state.params,aliId,actId})
    }
    componentWillMount() {
        const {getActId, token} = this.props
        getActId(API.get_actId,{token})
    }
    componentWillUnmount() {
        const {ClearMsg} = this.props
        ClearMsg("")
        return true
    }
    render() { 
        const {msg, updateGridPage} = this.props
        if(msg === "操作成功") {
            Toast.success("操作成功", 1, ()=>{this.props.navigation.goBack(); updateGridPage()}, true)
        }
        const {dept, user, place} = this.props
        let data = []
        if (this.state.pickerValue[0] == "AI_USE_PERSON_ID") data = data.concat(user);
        else if (this.state.pickerValue[0] == "AI_USE_DEPT_ID") data = data.concat(dept);
        else data = data.concat(place)
        // console.log(data)
        return (
            <List>
                <Picker
                    cols="1"
                    visible={this.state.visible}
                    data={this.state.content}
                    value={this.state.pickerValue}
                    onChange={v => {this.setState({pickerValue:v});this.showValue(v)}}
                    onOk={(v) => {this.setState({ visible: false })}}
                    onDismiss={() => this.setState({ visible: false })}
                    format={(labels) => { return labels; }}
                    >
                    <List.Item 
                        onClick={() => this.setState({ visible: true })}>
                        请选择变更字段
                    </List.Item>
                </Picker>
                <List.Item
                    extra={ <Text>{this.state.before}</Text> }>
                    变更前
                </List.Item>
                <Picker
                    cols={this.state.cols}
                    visible={this.state.aftervisible}
                    data={data}
                    value={this.state.afterpickerValue}
                    onChange={v => {this.setState({afterpickerValue:v,params:{...this.state.params,aciValueAfter:v[0]}});}}
                    onOk={(v) => {this.setState({ aftervisible: false })}}
                    onDismiss={() => this.setState({ aftervisible: false })}
                    format={(labels) => { return labels; }}
                    >
                    <List.Item 
                        extra={<Text>选择</Text>}
                        onClick={() => {data.length>0?this.setState({ aftervisible: true }):Toast.info("请先选择变更内容", 0.8)}}>
                        变更后
                    </List.Item>
                </Picker>
                <Button size="small" onClick={this.choosePic.bind(this)} style={{width: 100, marginLeft: 15, marginTop: 5}} >新增凭证</Button>
                <WhiteSpace />
                <View style={{display: "flex", flexDirection:"row", flexWrap:"wrap",justifyContent:"space-around",alignItems:"center"}}>
                    {this.showAllImages(this.state.images).map((d)=>(d))}
                </View> 
                <WhiteSpace/>
                <WhiteSpace/>
                <Button type="primary" onClick={this.submit}>提交</Button>
            </List>
        );
    }
}

export default connect(
    (state)=> ({
        msg: state.gridReducer.msg,
        token: state.homeReducer.token,
        userinfo: state.homeReducer.userinfo,
        user: state.gridReducer.user,
        dept: state.gridReducer.dept,
        place: state.gridReducer.place,
        actId: state.gridReducer.actId,
        aliId: state.gridReducer.aliId,
    }),
    (dispatch)=> ({
        getPlaceList: (url, params) => dispatch(getPlaceList(url, params)),
        getDeptList: (url, params) => dispatch(getDeptList(url, params)),
        getUserList: (url, params) => dispatch(getUserList(url, params)),
        SubmitChange: (url, params) => dispatch(SubmitChange(url, params)),
        uploadFile: (url,params) => {dispatch(uploadFile(url,params))},
        ClearMsg: (msg) => {dispatch(ClearMsg(msg))},
        getActId: (url,params) => {dispatch(getActId(url,params))},
        updateGridPage: () => {dispatch(updateGridPage())},
        
    })
)(ChangePage)