import React from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableHighlight } from 'react-native';
import { List, WhiteSpace, InputItem } from 'antd-mobile'

export default class ScrapPage extends React.Component {
  render() {
    return (
        <List renderHeader={()=>{}}>
            <List.Item
                extra={ <InputItem></InputItem> }>
                维修原因
            </List.Item>
            <List.Item
                extra={ <Text></Text> }>
                维修内容
            </List.Item>
            <List.Item
                extra={ <Text></Text> }>
                维修时间
            </List.Item>
            <List.Item
                arrow="horizontal"
                extra={
                    <View style={{flex:1,flexDirection:"row",justifyContent:"flex-end", alignItems:"center", height:40}}>
                        <Text style={{color:"#ccc"}} > 请选择领用部门 </Text>
                    </View>
                }>
                维修部门
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
        </List>
    );
  }
}