import React from 'react';
import { StyleSheet, Text, Image, View, SafeAreaView } from 'react-native';
import { InputItem, Button, WhiteSpace, Toast } from 'antd-mobile'
import {BundleId} from '../../utils/devInfo'
import API from '../../utils/apiMap'
import { connect} from 'react-redux';
import { doUserLogin, doUserCheck,ClearMsg, doUpdateCheck } from '../action'

class LoginPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            userpwd: ""
        }
        // alert(BundleId)
    }
    doLogIn= ()=>{
        const { doUserLogin, ClearMsg } = this.props
        Toast.loading("",0.6,()=>{ClearMsg()},true)
        doUserLogin(API.user_login, {userId:this.state.username, pwd:this.state.userpwd})
    }
    componentDidMount() {
        const {doUpdateCheck} = this.props
        doUpdateCheck(API.checkUpdate)
    }
    render() {
        const { msg, ClearMsg } = this.props
        console.log(msg)
        if(msg !== "") Toast.info(msg,0.6,()=>{ClearMsg()},true)
        return (
            <View>
                <SafeAreaView/>
                <View >
                    <Image source={require("../img/my_top_bg.png")} style={{height:120, width:"100%"}}/>
                    <Image source={require("../img/my_icon.png")} style={{height:110, marginTop:"-10%",alignSelf:"center"}} />
                    <Text style={{alignSelf:"center", fontSize:20,marginTop:10, marginBottom:30}}>用户登录</Text>
                </View>
                <WhiteSpace/>
                <InputItem
                autoCapitalize="none"
                style={{marginLeft: 40, marginRight: 40}}
                    clear
                    // onErrorPress={}
                    // value=""
                    onChange={(value) => {
                        this.setState({
                            username: value
                        })
                    }}
                    placeholder="请输入用户名"
                >
                用户名
                </InputItem>
                <InputItem
                type="password"
                style={{marginLeft: 40, marginRight: 40}}
                    clear
                    // onErrorPress={}
                    // value=""
                    onChange={(value) => {
                        this.setState({
                            userpwd: value
                        })
                    }}
                    placeholder="请输入密码"
                >
                密码
                </InputItem>
                <WhiteSpace/>
                <Button type="primary" style={{marginLeft: 40, marginRight: 40}} onClick={this.doLogIn}>登录</Button>
                
            </View>
        )
    }
}

export default connect(
    (state)=>({
        msg: state.homeReducer.msg
    }),
    (dispatch)=>({
        doUserLogin: (url,params) => {dispatch(doUserLogin(url,params))},
        doUserCheck: (url,params) => {dispatch(doUserCheck(url,params))},
        doUpdateCheck: (url,params) => {dispatch(doUpdateCheck(url,params))},
        ClearMsg: () => (dispatch(ClearMsg()))
        
    })
)(LoginPage)