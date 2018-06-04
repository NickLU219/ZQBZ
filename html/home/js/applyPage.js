import React from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableHighlight } from 'react-native';
import { List, WhiteSpace, Button, SearchBar, Picker,Toast, Grid, TextareaItem } from 'antd-mobile'

import { connect } from 'react-redux'
import { SubmitApply, getDeptList, getUserList, ClearMsg, uploadFile, getActId } from '../action'
import API from '../../utils/apiMap';

import Basic from './basic'
class ApplyPage extends Basic {
    constructor(props) {
        super(props)
        const {item} = this.props.navigation.state.params
        const {token} = this.props
        // console.log(item)
        const time = new Date() 
        // console.log(time,time.toLocaleTimeString())
        this.dateString = time.toLocaleDateString().replace(/\//g,"-")+" " +time.getHours()+":"+time.getMinutes()+":"+time.getSeconds()
        this.state = {
            ...this.state,
            params: {
                aiId: item.aiId,
                token: token,
                agiUsePersonBefore: item.aiUsePersonId,
                agiUseDeptBefore:item.aiUseDeptId,
                agiGetPerson:"",
                agiGetDept:"",
                agiGetPersonName:"",
                agiGetDeptName:"",
                agiGetRemark:"",
                agiGetTime: this.dateString,
            },
            deptPickerValue: [],
            deptVisible: false,
            userPickerValue: [],
            userVisible: false,
        };
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
        const {submitApply,dept,user, uploadFile, actId, aliId} = this.props
        const url = API.doOperation.apply
        const {item} = this.props.navigation.state.params
        const params = this.state.params
        
        for (i in dept) {
            if(this.state.deptPickerValue[2] == dept[i]["odId"]){
                params.agiGetDeptName = dept[i]["odName"];
            }
            if (dept[i].children.length>0) {
                let dept2 = dept[i].children
                for (i in dept2) {
                    if(this.state.deptPickerValue[2] == dept2[i]["odId"]){
                        params.agiGetDeptName = dept2[i]["odName"];
                    }
                    if (dept2[i].children.length>0) {
                        let dept3 = dept2[i].children
                        for (i in dept3) {
                            if(this.state.deptPickerValue[2] == dept3[i]["odId"]){
                                params.agiGetDeptName = dept3[i]["odName"];
                            }
                        }
                    }
                }
            }
        }
        for (k in user) {
            if(params.agiGetPerson == user[k]["value"]){
                params.agiGetPersonName = user[k]["label"];
            } 
        }

        //测试上传图片
        // for(let i=0;i<this.state.images.length;i++)
        uploadFile(API.upload_file, {spFile:this.state.images, token, actId, asfUploadPerson:userinfo.oeId,aliId})

        if(this.submitcheck)
            submitApply(url, params)
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

        let dept = this.props.dept
        const user = this.props.user
        const {item} = this.props.navigation.state.params
        const aiUseDept = item.aiUseDept
        const aiUsePerson = item.aiUsePerson
        let dept2User = ""
		return (
			<List>
                <List.Item
                    extra={ <Text>{aiUseDept}</Text> }>
                    原始部门
                </List.Item>
                <List.Item
                    extra={ <Text>{aiUsePerson}</Text> }>
                    原始使用人
                </List.Item>
                <Picker
                    cols="3"
                    visible={this.state.deptVisible}
                    data={dept}
                    value={this.state.deptPickerValue}
                    onChange={v => {this.setState({ params: {...this.state.params, agiGetDept:v[1] },deptPickerValue:v});dept2User=v[1];}}
                    onOk={(v) => {this.setState({ deptVisible: false });this.getPerson(dept2User)}}
                    onDismiss={() => this.setState({ deptVisible: false })}
                    format={(labels) => { return labels[labels.length-1]; }}
                    >
                    <List.Item 
                        onClick={() => this.setState({ deptVisible: true })}>
                        请选择领用部门
                    </List.Item>
                </Picker>
                <Picker
                    cols="1"
                    visible={this.state.userVisible}
                    data={user}
                    value={this.state.userPickerValue}
                    onChange={v => this.setState({ params: {...this.state.params, agiGetPerson:v[v.length-1] }, userPickerValue:v })}
                    onOk={() => {this.setState({ userVisible: false })}}
                    onDismiss={() => this.setState({ userVisible: false })}
                    >
                    <List.Item extra={
                            <View style={{flex:1,flexDirection:"row",justifyContent:"flex-end", alignItems:"center", height:40}}>
                                <Text style={{color:"#ccc"}}> 请选择领用人 </Text>
                            </View> } 
                        onClick={() => {user.length>0?this.setState({ userVisible: true }) : Toast.info("请先选择部门", 0.8)}}>
                        请选择领用人
                    </List.Item>
                </Picker>
                <List.Item
                    extra={<Text>{this.dateString}</Text>}>
                    领用时间
                </List.Item>
                <List.Item
                    extra={ <TextareaItem rows={4} style={{fontSize: 15,width: 200,textAlign: "right"}} placeholder="请填写领用描述" autoHeight onChange={(v) => this.setState({params: {...this.state.params, agiGetRemark:v}})}/> }>
                    领用描述
                </List.Item>
                {/* <Text>领用凭证</Text> */}
                {/* <TouchableHighlight onPress={this.choosePic.bind(this)} underlayColor="#eee" style={{margin: 20}}>
                    <Image source={this.avatarSource} style={{height:50, width:"30%", alignSelf:'center',}} />
                </TouchableHighlight> */}
                <Button size="small" onClick={this.choosePic.bind(this)} style={{width: 100, marginLeft: 15, marginTop: 5}} >新增凭证</Button>
                <WhiteSpace />
                <View style={{display: "flex", flexDirection:"row", flexWrap:"wrap",justifyContent:"space-around",alignItems:"center"}}>
                    {this.showAllImages(this.state.images).map((d)=>(d))}
                </View>
                <WhiteSpace/>
                <WhiteSpace/>
                {/* <Grid data={this.data} columnNum={3} itemStyle={{height:50 , width:50}} /> */}
                <Button type="primary" onClick={this.submit}>提交</Button>
            </List>
		)
	}
}

export default connect(
    state => ({
        msg: state.gridReducer.msg,
        token: state.homeReducer.token,
        userinfo : state.homeReducer.userinfo,
        dept: state.gridReducer.dept,
        user: state.gridReducer.user,
        actId: state.gridReducer.actId,
        aliId: state.gridReducer.aliId,
    }),
    dispatch => ({
        submitApply: (url,params) => {dispatch(SubmitApply(url,params))},
        getDeptList: (url,params) => {dispatch(getDeptList(url,params))},
        getUserList: (url,params) => {dispatch(getUserList(url,params))},
        uploadFile: (url,params) => {dispatch(uploadFile(url,params))},
        ClearMsg: (msg) => {dispatch(ClearMsg(msg))},
        getActId: (url,params) => {dispatch(getActId(url,params))},
    })
)(ApplyPage)