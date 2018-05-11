import React from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableHighlight } from 'react-native';
import { List, WhiteSpace, InputItem, Button, Picker } from 'antd-mobile'

import { connect } from 'react-redux'
import { SubmitScrap ,getDeptList, getUserList } from '../action'
import API from '../../utils/apiMap';

class ScrapPage extends React.Component {

    constructor(props) {
        super (props) 
        const {item } = this.props.navigation.state.params
        // console.log(item)
        const {userinfo} = this.props
        const time = new Date() 
        this.dateString = time.toLocaleDateString().replace(/\//g,"-")+" " +time.getHours()+":"+time.getMinutes()+":"+time.getSeconds()
        // console.log(userinfo)
        this.state = {
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
        const {submitScrap} = this.props
        // console.log(submitApply)
        const url = API.doOperation.scrap
        const {item} = this.props.navigation.state.params
        const params = this.state.params
        
        // console.log("submit", params)
        submitScrap(url, params)
    }
    render() {
        const {userinfo} = this.props
        return (
            <List>
                <List.Item
                    extra={ <TextInput onChangeText={(v)=>(this.setState({params: {...this.state.params,asiScrapExplan:v}}))} placeholder="请填写报废原因" style={{textAlign: "right"}} /> }>
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
    }),
    (dispatch)=> ({
        submitScrap: (url,params) => {dispatch(SubmitScrap(url,params))},
        getDeptList: (url,params) => {dispatch(getDeptList(url,params))},
        getUserList: (url,params) => {dispatch(getUserList(url,params))}
    })
)(ScrapPage)