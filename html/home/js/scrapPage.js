import React from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableHighlight } from 'react-native';
import { List, WhiteSpace, InputItem, Button, Picker, Toast, TextareaItem } from 'antd-mobile'

import { connect } from 'react-redux'
import { SubmitScrap ,getDeptList, getUserList, ClearMsg, uploadFile, getActId } from '../action'
import API from '../../utils/apiMap';

import Basic from './basic'
class ScrapPage extends Basic {

    constructor(props) {
        super (props) 
        const {item } = this.props.navigation.state.params
        // console.log(item)
        const {userinfo} = this.props
        const time = new Date() 
        this.dateString = time.toLocaleDateString().replace(/\//g,"-")+" " +time.getHours()+":"+time.getMinutes()+":"+time.getSeconds()
        // console.log(userinfo)
        this.state = {
            ...this.state,
            params: {
                token:this.props.token,
                aiId:item.aiId,
                asiScrapPerson:userinfo.oeId, //报废人
                asiScrapPersonName:userinfo.oeName, //报废人姓名
                asiScrapDept:userinfo.odId,//报废人部门
                asiScrapTime:this.dateString, 
                asiScrapExplan: ""
            }
        }

    }
    submit = () => {
        const {submitScrap, uploadFile, actId, aliId} = this.props
        // console.log(submitApply)
        const url = API.doOperation.scrap
        const {item} = this.props.navigation.state.params
        const params = this.state.params
        
        //测试上传图片
        uploadFile(API.upload_file, {spFile:this.state.images, token, actId, asfUploadPerson:userinfo.oeId,aliId})
        
        // console.log("submit", params)
        if(this.submitcheck()) 
            submitScrap(url, {...params,aliId,actId})
    }
    componentWillUnmount() {
        const {ClearMsg} = this.props
        ClearMsg("")
        return true
    }
    render() {
        const {msg} = this.props
        if(msg === "操作成功") {
            Toast.success("操作成功", 1, ()=>{this.props.navigation.goBack()}, true)
        }
        const {userinfo} = this.props
        return (
            <List>
                <List.Item
                    extra={ <TextareaItem rows={4} style={{fontSize: 15,width: 200,textAlign: "right"}} placeholder="请填写报废原因" autoHeight onChange={(v)=>(this.setState({params: {...this.state.params,asiScrapExplan:v}}))}/> }>
                    报废原因
                </List.Item>
                <List.Item
                    extra={ <Text>{userinfo.oeName}</Text> }>
                    报废人
                </List.Item>
                <List.Item
                    extra={ <Text>{userinfo.odName}</Text> }>
                    报废人部门
                </List.Item>
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
        userinfo : state.homeReducer.userinfo,
        dept: state.gridReducer.dept,
        user: state.gridReducer.user,
        actId: state.gridReducer.actId,
        aliId: state.gridReducer.aliId,
    }),
    (dispatch)=> ({
        submitScrap: (url,params) => {dispatch(SubmitScrap(url,params))},
        getDeptList: (url,params) => {dispatch(getDeptList(url,params))},
        getUserList: (url,params) => {dispatch(getUserList(url,params))},
        uploadFile: (url,params) => {dispatch(uploadFile(url,params))},
        ClearMsg: (msg) => {dispatch(ClearMsg(msg))},
        getActId: (url,params) => {dispatch(getActId(url,params))},
    })
)(ScrapPage)