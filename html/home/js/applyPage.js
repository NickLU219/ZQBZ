import React from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableHighlight } from 'react-native';
import { List, WhiteSpace, Button, SearchBar, Picker,Toast, Grid } from 'antd-mobile'

import ImagePicker from 'react-native-image-picker'
import { connect } from 'react-redux'
import { SubmitApply, getDeptList, getUserList } from '../action'
import API from '../../utils/apiMap';

class ApplyPage extends React.Component{
    constructor(props) {
        super(props)
        const {item} = this.props.navigation.state.params
        const {token} = this.props
        // console.log(item)
        const time = new Date() 
        // console.log(time,time.toLocaleTimeString())
        this.dateString = time.toLocaleDateString().replace(/\//g,"-")+" " +time.getHours()+":"+time.getMinutes()+":"+time.getSeconds()
        this.state = {
            avatarSource: require("../img/upload.png"),
            params: {
                aiId: item.aiId,
                token: token,
                agiUsePersonBefore: item.aiUsePersonId,
                agiUseDeptBefore:item.aiUseDeptId,
                agiGetPerson:"",
                agiGetDept:"",
                agiGetPersonName:"领用人姓名",
                agiGetDeptName:"领用部门姓名",
                agiGetRemark:"",
                agiGetTime: this.dateString,
            },
            deptPickerValue: [],
            deptVisible: false,
            userPickerValue: [],
            userVisible: false,
        };
        //图片选择器参数设置
        this.options = {
            title: '请选择图片来源',
            cancelButtonTitle:'取消',
            takePhotoButtonTitle:'拍照',
            chooseFromLibraryButtonTitle:'相册图片',
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };
        this.getDept()
        // this.getPerson()
    }
      //选择照片按钮点击
    choosePic() {
        ImagePicker.showImagePicker(this.options, (response) => {
            // console.log('Response = ', response);

            if (response.didCancel) {
                console.log('用户取消了选择！');
            }
            else if (response.error) {
                alert("ImagePicker发生错误：" + response.error);
            }
            else {
                // let source = { uri: response.uri };
                // You can also display the image using data:
                let source = { uri: 'data:image/jpeg;base64,' + response.data };
                this.setState({
                    avatarSource: source,
                    agiGetRemark, source
                });
            }
        })
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
        const {submitApply,dept,user} = this.props
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
        submitApply(url, params)
    }


	render() {
        const {msg} = this.props
        // console.log(msg)
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
			<List renderHeader={()=>{}}>
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
                        onClick={() => this.setState({ userVisible: true })}>
                        请选择领用人
                    </List.Item>
                </Picker>
                <List.Item
                    extra={<Text>{this.dateString}</Text>}>
                    领用时间
                </List.Item>
                <List.Item
                    extra={ <TextInput onChangeText={(v) => this.setState({params: {...this.state.params, agiGetRemark:v}})} placeholder="请填写领用描述" style={{textAlign: "right"}} /> }>
                    领用描述
                </List.Item>
                {/* <Text>领用凭证</Text> */}
                <TouchableHighlight onPress={this.choosePic.bind(this)} underlayColor="#eee" style={{margin: 20}}>
                    <Image source={this.state.avatarSource} style={styles.image} />
                </TouchableHighlight>
                <WhiteSpace/>
                <WhiteSpace/>
                {/* <Grid data={this.data} columnNum={3} itemStyle={{height:50 , width:50}} /> */}
                <Button type="primary" onClick={this.submit}>提交</Button>
            </List>
		)
	}
}
//样式定义
const styles = StyleSheet.create({
    image:{
        height:50,
        width:"30%",
        alignSelf:'center',
    },
});

export default connect(
    state => ({
        msg: state.gridReducer.msg,
        token: state.homeReducer.token,
        userinfo : state.homeReducer.userinfo,
        dept: state.gridReducer.dept,
        user: state.gridReducer.user,
    }),
    dispatch => ({
        submitApply: (url,params) => {dispatch(SubmitApply(url,params))},
        getDeptList: (url,params) => {dispatch(getDeptList(url,params))},
        getUserList: (url,params) => {dispatch(getUserList(url,params))}
    })
)(ApplyPage)