import React from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableHighlight } from 'react-native';
import { List, WhiteSpace, InputItem,Button, Picker, Toast, TextareaItem } from 'antd-mobile'

import ImagePicker from 'react-native-image-picker'
export default class BasicPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            images : [],
            imagenames : []
        }
        //图片选择器参数设置
        this.avatarSource= require("../img/upload.png"),
        // this.images= []
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
    submitcheck = (callback) => {
        for (i in this.state.params) {
            if (this.state.params[i] == "") {
                Toast.info("请完善选项", 0.8)
                return
            }
        }
        callback()
    }

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
                let source = { uri: response.uri };
                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };
                const images = this.state.images
                const imagenames = this.state.imagenames
                images.push(source)
                imagenames.push(response.fineName)
                this.setState({
                    images, imagenames
                    // agiGetRemark, source
                });
                // this.images.push(source)
                console.log(this.state.images)
            }
        })
    }

    showAllImages = (images) => {
                
        let img = []
        // img.push()
        images.forEach((v,i,a) => (
            img.push(<Image source={v} style={{height:100, width: 150, margin: 5}} />)        
        ))
        // img.push(</View>)
        return img
    }

}