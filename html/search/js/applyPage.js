import React from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableHighlight } from 'react-native';
import { List, WhiteSpace } from 'antd-mobile'

import ImagePicker from 'react-native-image-picker'


export default class ApplyPage extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            avatarSource: require("../img/upload.png")
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
            console.log('Response = ', response);

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
                    avatarSource: source
                });
            }
        })
    }
	render() {
		return (
			<List renderHeader={()=>{}}>
                <List.Item
                    extra={ <Text>宿迁支队</Text> }>
                    原始部门
                </List.Item>
                <List.Item
                    extra={ <Text>柳冲</Text> }>
                    原始使用人
                </List.Item>
                <List.Item
                    arrow="horizontal"
                    extra={
                        <View style={{flex:1,flexDirection:"row",justifyContent:"flex-end", alignItems:"center", height:40}}>
                            <Text style={{color:"#ccc"}} onp> 请选择领用部门 </Text>
                        </View>
                    }>
                    领用部门
                </List.Item>
                <List.Item
                    arrow="horizontal"
                    extra={
                        <View style={{flex:1,flexDirection:"row",justifyContent:"flex-end", alignItems:"center", height:40}}>
                            <Text style={{color:"#ccc"}}> 请选择领用人 </Text>
                        </View>
                    }>
                    领用人
                </List.Item>
                <List.Item
                    extra="2018.04.26">
                    领用时间
                </List.Item>
                <TouchableHighlight onPress={this.choosePic.bind(this)} underlayColor="#eee" style={{margin: 20}}>
                    <Image source={this.state.avatarSource} width="100%" style={styles.image} />
                </TouchableHighlight>
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