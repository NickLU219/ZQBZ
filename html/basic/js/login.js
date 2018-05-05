import React from 'react';
import { StyleSheet, Text, Image, View, SafeAreaView } from 'react-native';
import { InputItem, Button, WhiteSpace } from 'antd-mobile'

import API from '../../utils/apiMap'
import { connect} from 'react-redux';
import { doUserLogin} from '../action'

class LoginPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userid: ""
        }
    }
    render() {

        const { doUserLogin } = this.props
        return (
            <View>
                <SafeAreaView/>
                <View >
                    <Image source={require("../img/my_top_bg.png")} style={{height:120, width:"100%"}}/>
                    <Image source={require("../img/my_icon.png")} style={{height:110, marginTop:"-10%",alignSelf:"center"}} />
                    <Text style={{alignSelf:"center", fontSize:20,marginTop:10, marginBottom:30}}>宿迁支队管理员(8532)</Text>
                </View>
                <WhiteSpace/>
                <InputItem
                style={{marginLeft: 30, marginRight: 30}}
                    clear
                    // onErrorPress={}
                    value=""
                    onChange={(value) => {
                        this.setState({
                            userid: value
                        })
                    }}
                    placeholder="请输入用户id"
                >
                用户名
                </InputItem>
                <WhiteSpace/>
                <Button type="primary" style={{marginLeft: 40, marginRight: 40}} onClick={()=>doUserLogin(API.user_login, {oeCode:this.state.userid})}>登录</Button>
            </View>
        )
    }
}

export default connect(
    (state)=>({}),
    (dispatch)=>({
        doUserLogin: (url,params) => {dispatch(doUserLogin(url,params))}}
    )
)(LoginPage)