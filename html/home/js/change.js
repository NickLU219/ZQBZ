import React from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableHighlight } from 'react-native';
import { List, WhiteSpace, InputItem, Picker, Button } from 'antd-mobile'
import {connect} from 'react-redux'

class ScrapPage extends React.Component {
    constructor(props) {
        super(props)
        this.state= {
            content: [
                {value:"1", label:"人员"},
                {value:"2", label:"部门"},
                {value:"3", label:"位置"}
            ],
            visible: false,
            pickerValue: []
        }

        const item = this.props.navigation.state.params.item
        console.log(item)
    }
    
    render() {
        return (
            <List renderHeader={()=>{}}>
                <Picker
                    cols="1"
                    visible={this.state.visible}
                    data={this.state.content}
                    value={this.state.pickerValue}
                    onChange={v => {this.setState({pickerValue:v});}}
                    onOk={(v) => {this.setState({ visible: false })}}
                    onDismiss={() => this.setState({ visible: false })}
                    format={(labels) => { return labels; }}
                    >
                    <List.Item 
                        onClick={() => this.setState({ visible: true })}>
                        请选择变更字段
                    </List.Item>
                </Picker>
                <List.Item
                    extra={ <Text></Text> }>
                    变更前
                </List.Item>
                <List.Item
                    extra={ <Text></Text> }>
                    变更后
                </List.Item>
                
                <WhiteSpace/>
                <WhiteSpace/>
                <Button type="primary">提交</Button>
            </List>
        );
    }
}

export default connect(
    (state)=> ({
        token: state.homeReducer.token,
        userinfo: state.homeReducer.userinfo
    }),
    (dispatch)=> ({

    })
)(ScrapPage)