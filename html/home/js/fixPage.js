import React from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableHighlight } from 'react-native';
import { List, WhiteSpace, InputItem, Button, Picker, Toast, TextareaItem } from 'antd-mobile'

import { connect } from 'react-redux'
import {  SubmitFix,getDeptList, getUserList, ClearMsg } from '../action'
import API from '../../utils/apiMap';

class FixPage extends React.Component {
    constructor(props) {
        super(props)
        const {item } = this.props.navigation.state.params
        // console.log(item)
        const time = new Date() 
        this.dateString = time.toLocaleDateString().replace(/\//g,"-")+" " +time.getHours()+":"+time.getMinutes()+":"+time.getSeconds()
        
        this.state= {
            deptPickerValue: [],
            deptVisible: false,
            userPickerValue: [],
            userVisible: false,
            params: {
                token:this.props.token,
                aiId: item.aiId,
                afiFixReason: "",
                afiFixContent: "",
                afiFixTime : this.dateString,
                afiFixDept: "",
                afiFixPerson: ""
            }
        }

        this.getDept()
    }
    getDept = () => {
        console.log("获取领用部门")
        const {getDeptList, userinfo,token} = this.props
        getDeptList(API.dept_list, {odDwId:userinfo.odDwId, token})
    }
    getPerson = (dept2User) => {
        console.log("获取领用人")
        const {getUserList, userinfo,token} = this.props
        getUserList(API.user_list, {odId:dept2User, token})
    }
    submit = () => {
        const {submitFix,dept,user} = this.props
        // console.log(submitApply)
        const url = API.doOperation.fix
        const {item} = this.props.navigation.state.params
        const params = this.state.params
        
        // console.log("submit", params)
        submitFix(url, params)
    }

    componentWillUnmount() {
        const {ClearMsg} = this.props
        ClearMsg("")
        return true
    }
    render() {
        const {msg} = this.props
        // console.log(msg)
        if(msg === "操作成功") {
            Toast.success("操作成功", 1, ()=>{this.props.navigation.goBack()}, true)
        }
        let dept = this.props.dept
        const user = this.props.user
        let dept2User = ""
        return (
            <List renderHeader={()=>{}}>
                <Picker
                    cols="3"
                    visible={this.state.deptVisible}
                    data={dept}
                    value={this.state.deptPickerValue}
                    onChange={v => {this.setState({ params: {...this.state.params, afiFixDept:v[2] },deptPickerValue:v});dept2User=v[1];}}
                    onOk={(v) => {this.setState({ deptVisible: false });this.getPerson(dept2User)}}
                    onDismiss={() => this.setState({ deptVisible: false })}
                    format={(labels) => { return labels[labels.length-1]; }}
                    >
                    <List.Item 
                        onClick={() => this.setState({ deptVisible: true })}>
                        请选择维修部门
                    </List.Item>
                </Picker>
                <Picker
                    cols="1"
                    visible={this.state.userVisible}
                    data={user}
                    value={this.state.userPickerValue}
                    onChange={v => this.setState({ params: {...this.state.params, afiFixPerson:v[v.length-1] }, userPickerValue:v })}
                    onOk={() => {this.setState({ userVisible: false })}}
                    onDismiss={() => this.setState({ userVisible: false })}
                    >   
                    <List.Item extra={
                        <View style={{flex:1,flexDirection:"row",justifyContent:"flex-end", alignItems:"center", height:40}}>
                            <Text style={{color:"#ccc"}}> 请选择领用人 </Text>
                        </View> } 
                    onClick={() => {user.length>0?this.setState({ userVisible: true }):Toast.info("请先选择维修部门", 0.8)}}>
                    请选择维修人
                </List.Item>             
                </Picker>
                <List.Item
                    extra={ <Text>{this.dateString}</Text> }>
                    维修时间
                </List.Item>
                <List.Item
                    extra={ <TextareaItem rows={4} style={{fontSize: 15,width: 200,textAlign: "right"}} placeholder="请填写维修内容" autoHeight onChange={(v)=>(this.setState({params: {...this.state.params,afiFixContent:v}}))}/> }>
                    维修内容
                </List.Item>
                <List.Item
                    extra={ <TextareaItem rows={4} style={{fontSize: 15,width: 200,textAlign: "right"}} placeholder="请填写维修原因" autoHeight onChange={(v)=>(this.setState({params: {...this.state.params,afiFixReason:v}}))} /> }>
                    维修原因
                </List.Item>                
                <WhiteSpace/>
                <WhiteSpace/>
                <Button type="primary" onClick={this.submit}>提交</Button>
            </List>
        );
    }
}

export default connect(
    state => ({
        msg: state.gridReducer.msg,
        token: state.homeReducer.token,
        userinfo : state.homeReducer.userinfo,
        dept: state.gridReducer.dept,
        user: state.gridReducer.user,
    }),
    dispatch => ({
        submitFix: (url,params) => {dispatch(SubmitFix(url,params))},
        getDeptList: (url,params) => {dispatch(getDeptList(url,params))},
        getUserList: (url,params) => {dispatch(getUserList(url,params))},
        ClearMsg: (msg) => {dispatch(ClearMsg(msg))}
    })
)(FixPage)