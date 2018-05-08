import React from 'react';
import { View } from 'react-native';
import { List, Accordion } from 'antd-mobile'

import { getDeptList, getUserList } from '../action'
import API from '../../utils/apiMap'
import {connect} from 'react-redux'

class CommonList extends React.Component {
    constructor(props) {
        super(props)
        const {key} = this.props.navigation.state.params
        const {getDeptList, getUserList, userinfo,token} = this.props
        console.log(userinfo)
        switch (key) {
            case "dept": getDeptList(API.dept_list, {odDwId:userinfo.odDwId, token}); break;
            case "user": getUserList(API.dept_list, {odId:userinfo.odDwId, token}); break;
        }
    }
    render() {
        const { data } = this.props
        const {key} = this.props.navigation.state.params
        console.log(key,data)
        if(key === "dept") {
            // const dataTmp = {}
            // for (index in data) {
            //     // console.log(data[index])
            //     if (data[index])
            //     dataTmp[index] = data[index]
            // }
        }
        
        renderList = (data) => <Accordion.Panel header="Title 1"></Accordion.Panel>
        return (
            <View style={{ marginTop: 0, marginBottom: 10 }}>
                <Accordion onChange={this.onChange} defaultActiveKey="">
                <Accordion.Panel header="Title 1">
                    <List>
                        <List.Item>Content 1</List.Item>
                        <List.Item>Content 2</List.Item>
                        <List.Item>Content 3</List.Item>
                    </List>
                </Accordion.Panel>
                <Accordion.Panel header="Title 2">
                    this is panel content2 or other
                </Accordion.Panel>
                <Accordion.Panel header="Title 3">
                    Text text text text text text text text text text text text text
                    text text
                </Accordion.Panel>
                </Accordion>
            </View>
        )
    }
}

export default CommonListContainer = connect(
    (state)=>({
        data: state.gridReducer.data,
        userinfo : state.homeReducer.userinfo,
        token: state.homeReducer.token
	}),
	(dispatch)=>({
        getDeptList: (url, params) => {dispatch(getDeptList(url, params))},
        getUserList: (url, params) => {dispatch(getUserList(url, params))}
	})
)(CommonList)

