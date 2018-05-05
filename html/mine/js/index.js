import React from 'react';
import { View, Image, SafeAreaView, Text } from 'react-native';
import { List } from 'antd-mobile'

const Item = List.Item;
const Brief = Item.Brief;

export default class MinePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            settings: [
                {
                    icon: "",
                    title: "系统升级",
                    arrow: "horizontal"
                },
                {
                    icon: "",
                    title: "系统设置",
                    arrow: "horizontal"
                },
                {
                    icon: "",
                    title: "关于",
                    arrow: "empty"
                }
            ]
        }
    }

    render() {
        return (
            <View>
                <SafeAreaView/>
                <View >
                    <Image source={require("../img/my_top_bg.png")} style={{height:120, width:"100%"}}/>
                    <Image source={require("../img/my_icon.png")} style={{height:110, marginTop:"-10%",alignSelf:"center"}} />
                    <Text style={{alignSelf:"center", fontSize:20,marginTop:10, marginBottom:30}}>宿迁支队管理员(8532)</Text>
                </View>
                <List style={{width:"90%", alignSelf:"center"}}>
                    <Item
                    arrow="horizontal"
                    thumb={<Image source={require('../img/data.png')} style={{marginLeft:10, marginRight:20}} />}
                    multipleLine
                    onClick={() => {}}
                    >
                        系统升级
                    </Item>
                    <Item
                    arrow="horizontal"
                    thumb={<Image source={require('../img/set.png')} style={{marginLeft:10, marginRight:20}} />}
                    multipleLine
                    onClick={() => {}}
                    >
                        系统设置
                    </Item>
                    <Item
                    arrow="empty"
                    thumb={<Image source={require('../img/heip.png')} style={{marginLeft:10, marginRight:20}} />}
                    multipleLine
                    onClick={() => {}}
                    >
                        关于
                    </Item>
                </List>
            </View>
        )
    }
}