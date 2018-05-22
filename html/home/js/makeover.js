import React from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableHighlight } from 'react-native';
import { List, WhiteSpace, InputItem,Button, Picker, Toast, TextareaItem } from 'antd-mobile'
import ImagePicker from 'react-native-image-picker'
import { connect } from 'react-redux'
import { SubmitMakeOver ,getDeptList, getUserList, ClearMsg } from '../action'
import API from '../../utils/apiMap';

import Basic from './basic'
class MakeOverPage extends Basic {
    constructor(props) {
        super(props)
        
        const {item } = this.props.navigation.state.params
        // console.log("props",props)
        const {userinfo, token} = this.props
        const time = new Date() 
        this.dateString = time.toLocaleDateString().replace(/\//g,"-")+" " +time.getHours()+":"+time.getMinutes()+":"+time.getSeconds()
        
        this.state= {
            ...this.state,
            deptPickerValue: [],
            deptVisible: false,
            userPickerValue: [],
            userVisible: false,
            params: {
                token: token,
                aiId:item.aiId,
                amoiEmp: "",
                amoiEmpName: "",
                amoiDept:"", //操作人员部门
                amoiDeptName:" ",
                amoiExplain:"",
                amoiDate: this.dateString 
            },
        }
        // console.log("state", this.state)
        this.getDept()
    }

    getDept = () => {
        // console.log("获取领用部门")
        const {getDeptList, userinfo,token} = this.props
        getDeptList(API.dept_list, {odDwId:userinfo.odDwId, token})
    }
    getPerson = (dept2User) => {
        // console.log("获取领用人")
        const {getUserList, userinfo,token} = this.props
        getUserList(API.user_list, {odId:dept2User, token})
    }
    submit = () => {
        const {SubmitMakeOver,dept,user} = this.props
        // console.log(submitApply)
        const url = API.doOperation.makeOver
        const {item} = this.props.navigation.state.params
        const params = this.state.params
        
        for (i in dept) {
            if(this.state.deptPickerValue[2] == dept[i]["odId"]){
                params.amoiDeptName = dept[i]["odName"];
            }
            if (dept[i].children.length>0) {
                let dept2 = dept[i].children
                for (i in dept2) {
                    if(this.state.deptPickerValue[2] == dept2[i]["odId"]){
                        params.amoiDeptName = dept2[i]["odName"];
                    }
                    if (dept2[i].children.length>0) {
                        let dept3 = dept2[i].children
                        for (i in dept3) {
                            if(this.state.deptPickerValue[2] == dept3[i]["odId"]){
                                params.amoiDeptName = dept3[i]["odName"];
                            }
                        }
                    }
                }
            }
        }
        for (k in user) {
            if(params.amoiEmp == user[k]["value"]){
                params.amoiEmpName = user[k]["label"];
            } 
        }
        // console.log("submit", params)
        if(this.submitcheck()) SubmitMakeOver(url, params)
        
    }
    componentWillUnmount() {
        const {ClearMsg} = this.props
        ClearMsg("")
        return true
    }
    
    render() {
        console.log("render")
        const {msg} = this.props
        if(msg === "操作成功") {
            Toast.success("操作成功", 1, ()=>{this.props.navigation.goBack()}, true)
        }
        let dept = this.props.dept
        const user = this.props.user
        // console.log("dept",dept,user)
        const {item} = this.props.navigation.state.params
        const aiUseDept = item.aiUseDept
        const aiUsePerson = item.aiUsePerson
        let dept2User = ""
        return (
            <List >
                <List.Item
                    extra={ <TextareaItem rows={4} style={{fontSize: 15,width: 200,textAlign: "right"}} placeholder="请填写转让原因" autoHeight onChange={(v) => this.setState({params: {...this.state.params, amoiExplain:v}})}/> }>
                    转让原因
                </List.Item>
                <List.Item
                    extra={ <Text>{this.dateString}</Text> }>
                    转让时间
                </List.Item>
                <Picker
                    cols="3"
                    visible={this.state.deptVisible}
                    data={dept}
                    value={this.state.deptPickerValue}
                    onChange={v => {this.setState({ params: {...this.state.params, amoiDept:v[1] },deptPickerValue:v});dept2User=v[1];}}
                    onOk={(v) => {this.setState({ deptVisible: false });this.getPerson(dept2User)}}
                    onDismiss={() => this.setState({ deptVisible: false })}
                    format={(labels) => { return labels[labels.length-1]; }}
                    >
                    <List.Item 
                        onClick={() => this.setState({ deptVisible: true })}>
                        请选择转让部门
                    </List.Item>
                </Picker>
                <Picker
                    cols="1"
                    visible={this.state.userVisible}
                    data={user}
                    value={this.state.userPickerValue}
                    onChange={v => this.setState({ params: {...this.state.params, amoiEmp:v[v.length-1] }, userPickerValue:v })}
                    onOk={() => {this.setState({ userVisible: false })}}
                    onDismiss={() => this.setState({ userVisible: false })}
                    >
                    <List.Item extra={
                            <View style={{flex:1,flexDirection:"row",justifyContent:"flex-end", alignItems:"center", height:40}}>
                                <Text style={{color:"#ccc"}}> 请选择转让人 </Text>
                            </View> } 
                        onClick={() => {user.length>0?this.setState({ userVisible: true }):Toast.info("请先选择转让部门", 0.8)}}>
                        请选择转让人
                    </List.Item>
                </Picker>
                {/* <TouchableHighlight onPress={this.choosePic.bind(this)} underlayColor="#eee" style={{margin: 20, width:"30%", height: 50}}>
                    <Image source={this.avatarSource} style={{height:50, width: "100%", alignSelf:'center',}} />
                </TouchableHighlight> */}
                <Button size="small" onClick={this.choosePic.bind(this)} style={{width: 100, marginLeft: 15, marginTop: 5}} >新增凭证</Button>
                <WhiteSpace />
                <View style={{display: "flex", flex: 1, flexDirection:"row", flexWrap:"wrap",justifyContent:"space-around",alignItems:"center", height:400}}>
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
    state => ({
        msg: state.gridReducer.msg,
        token: state.homeReducer.token,
        userinfo : state.homeReducer.userinfo,
        dept: state.gridReducer.dept,
        user: state.gridReducer.user,
    }),
    dispatch => ({
        SubmitMakeOver: (url,params) => {dispatch(SubmitMakeOver(url,params))},
        getDeptList: (url,params) => {dispatch(getDeptList(url,params))},
        getUserList: (url,params) => {dispatch(getUserList(url,params))},
        ClearMsg: (msg) => {dispatch(ClearMsg(msg))}
    })
)(MakeOverPage)