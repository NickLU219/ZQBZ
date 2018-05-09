import React from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableHighlight } from 'react-native';
import { List, WhiteSpace, Button } from 'antd-mobile'

import ImagePicker from 'react-native-image-picker'
import { connect } from 'react-redux'
import { SubmitApply } from '../action'
import API from '../../utils/apiMap';

class ApplyPage extends React.Component{
    constructor(props) {
        super(props)
        const {item} = this.props.navigation.state.params
        const {token} = this.props
        this.state = {
            avatarSource: require("../img/upload.png"),
            params: {
                aiID: item.aiID,
                token: token,
                agiUsePersonBefore: item.aiUsePersonId,
                agiUseDeptBefore:item.aiUseDeptId,
                agiGetPerson:"",
                agiGetDept:"",
                agiGetPersonName:"领用人姓名",
                agiGetDeptName:"领用部门姓名",
                agiGetRemark:"",
                agiGetTime: (new Date()).toLocaleDateString(),
            }
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
        console.log("获取领用部门")
        this.props.navigation.navigate("Commonlist", {key: "dept"})
    }
    getPerson = () => {
        console.log("获取领用人")
        this.props.navigation.navigate("Commonlist", {key: "user"})
    }
    submit() {
        const {submitApply} = this.props
        console.log(submitApply)
        const url = API.doOperation.apply
        const {item} = this.props.navigation.state.params
        const params = this.state.params
        submitApply(url, params)
    }
	render() {
        const {item} = this.props.navigation.state.params
        const dept = item.aiUseDept
        const user = item.aiUsePerson
        
        // console.log(dept, user)
		return (
			<List renderHeader={()=>{}}>
                <List.Item
                    extra={ <Text>{dept}</Text> }>
                    原始部门
                </List.Item>
                <List.Item
                    extra={ <Text>{user}</Text> }>
                    原始使用人
                </List.Item>
                <List.Item
                    arrow="horizontal"
                    extra={
                        <View style={{flex:1,flexDirection:"row",justifyContent:"flex-end", alignItems:"center", height:40}}>
                            <Text style={{color:"#ccc"}} onPress={this.getDept}> 请选择领用部门 </Text>
                        </View>
                    }>
                    领用部门
                </List.Item>
                <List.Item
                    arrow="horizontal"
                    extra={
                        <View style={{flex:1,flexDirection:"row",justifyContent:"flex-end", alignItems:"center", height:40}}>
                            <Text style={{color:"#ccc"}} onPress={this.getPerson}> 请选择领用人 </Text>
                        </View>
                    }>
                    领用人
                </List.Item>
                <List.Item
                    extra={<Text>{this.state.agiGetTime}</Text>}>
                    领用时间
                </List.Item>
                {/* <Text>领用凭证</Text> */}
                <TouchableHighlight onPress={this.choosePic.bind(this)} underlayColor="#eee" style={{margin: 20}}>
                    <Image source={this.state.avatarSource} width="100%" style={styles.image} />
                </TouchableHighlight>
                <WhiteSpace/>
                <WhiteSpace/>
                <Button type="primary" onClick={this.submit()}>提交</Button>
            </List>
		)
	}
}
//样式定义
const styles = StyleSheet.create({
    image:{
        height:200,
        width:"100%",
        alignSelf:'center',
    },
});

export default connect(
    state => ({
        token: state.homeReducer.token
    }),
    dispatch => ({
		submitApply: (url,params) => {dispatch(SubmitApply(url,params))}
    })
)(ApplyPage)