import React from 'react';
import { Card, WhiteSpace, Grid, List } from 'antd-mobile';
import { Text, View, SafeAreaView, ScrollView, Image, StyleSheet, Platform } from 'react-native'
import { DeviceId } from '../../utils/devInfo'
import Echarts from 'native-echarts'
import { StackNavigator } from 'react-navigation';

import GridPage from './gridPage'
import ApplyPage from './applyPage';
import FixPage from './fixPage'
import ScrapPage from './scrapPage'
import CommonList from './conmonlist'
import { connect } from 'react-redux'

const Item = List.Item;
const Brief = Item.Brief;

class HomePage extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View style={{ height: "100%" }}>
                <ScrollView 
                    style={{ backgroundColor:"#eee" }}
                    scrollEnabled={true}
                    showsVerticalScrollIndicator={false}
                    endFillColor="black">
                    <SafeAreaView/>                     
                    <HomeHeaderComponent />
                    <WhiteSpace />
                    <HomeGrid props={{...this.props}} />
                    <WhiteSpace />
                    <HomeList props={{...this.props}} />
                    <WhiteSpace />
                    <WhiteSpace />
                    <HomeLineCharts/>
                    <WhiteSpace />
                    <HomePieCharts1 />
                    <WhiteSpace />
                    <HomePieCharts2 />
                </ScrollView>
            </View>
        );
    }
}

class HomeHeader extends React.Component {
    render() {
        const {userinfo} = this.props
        return (
            <View style={style.homeHeaderView}>
                <Image source={require('../img/top_bg.png')} style={style.homeHeaderBg} />
                <Text style={style.homeHeaderTitle}>首页</Text>
                <Image source={require('../img/home_icon.png')} style={style.homeHeaderIcon} />
                <Text style={style.homeHeaderAvater}>{userinfo.oeName}({userinfo.oeCode})</Text>
            </View>
        );
    }
}
let HomeHeaderComponent = connect(
    state=>(
        {userinfo: state.homeReducer.userinfo}
    )
)(HomeHeader)

class HomeGrid extends React.Component {
    constructor(props) {
        super(props)
        this.props = props
    }
    _gridJump = (el, index) => {
        switch (el.text) {
            case "资产领用": this.props.props.navigation.navigate("Get", {key: "Get"});break;            
            // case "资产借用": this.props.props.navigation.navigate("Borrow", {key: "Borrow"});break;
            case "资产转让": this.props.props.navigation.navigate("Return", {key: "Return"});break;
            case "资产变更": this.props.props.navigation.navigate("Change", {key: "Change"});break;
            case "资产维修": this.props.props.navigation.navigate("Repiar", {key: "Repiar"});break;
            case "资产报废": this.props.props.navigation.navigate("Deal", {key: "Deal"});break;
            case "资产自查": this.props.props.navigation.navigate("Search", {key: "Search"});break;
            case "我的资产": this.props.props.navigation.navigate("Mine", {key: "Mine"});break;
        }
    }
    render() {
        const data = [
            {
                icon: <Image source={require('../img/list01.png')}/>,
                text: '资产领用'
            },
            {
                icon: <Image source={require('../img/list02.png')}/>,
                text: '资产转让'
            },
            {
                icon: <Image source={require('../img/list03.png')}/>,
                text: '资产变更'
            },
            {
                icon: <Image source={require('../img/list04.png')}/>,
                text: '资产维修'
            },
            {
                icon: <Image source={require('../img/list05.png')}/>,
                text: '资产报废'
            },
            {
                icon: <Image source={require('../img/list06.png')}/>,
                text: '资产自查'
            },
            {
                icon: <Image source={require('../img/list07.png')}/>,
                text: '我的资产'
            },
            {
                icon: <Image source={require('../img/list08.png')}/>,
                text: '资产借用'
            },
            {
                icon: <Image source={require('../img/list06.png')}/>,
                text: '资产自查'
            },
            {
                icon: <Image source={require('../img/list07.png')}/>,
                text: '我的资产'
            },
            {
                icon: <Image source={require('../img/list06.png')}/>,
                text: '资产自查'
            },
            {
                icon: <Image source={require('../img/list07.png')}/>,
                text: '我的资产'
            }
        ]
        return (
            <View style={{backgroundColor:"white"}}>
                <Grid data={data} isCarousel hasLine={false} onClick={ (el, index) => {this._gridJump(el,index)}}/>
            </View>
        );
    }
}

class HomeList extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <List >
                <Item
                arrow="horizontal"
                thumb={<Image source={require('../img/list09.png')} style={{height: 38, width: 38, marginRight:20}}/>}
                multipleLine
                onClick={() => {}}
                >
                <Text style={{fontSize:15}}>资产到期提醒
                    <Image source={require('../img/remind.png')} style={{ height:5, width:5, left: 5, alignSelf:"auto"}}/> 
                </Text>
                <Brief style={{fontSize:10}}>收到新的资产消息提醒，请及时查看</Brief>
                </Item>
            </List>
        );
    }
}

class HomeLineCharts extends React.Component {
    render() {
        const option = {
            title: {
                text: '2008年宿迁消防支队资产总体情况',
                textStyle: {
                    fontSize: 14
                }
            },
            tooltip: {},
            legend: {
                data:['资产增加值','资产减少值','资产总价值'],
                right: 20,
                width: 50,
                orient: "vertical",
                itemGap: 5
            },
            grid: {
                left: 10,
                right: 10,
                bottom: 70,
                containLabel: true
            },
            toolbox: {
            },
            xAxis: {
                name: "单位",
                axisLabel:{
                    interval: 0,
                    rotate: 60
                },
                type: 'category',
                boundaryGap: false,
                data: ["支队机关","特宿区大队","宿豫区大队","湖滨新城大队","开发区大队","苏宿园区大队","洋河新城大队","沐阳县大队","泗洪县大队", "泗阳县大队","战勤保障大队","特勤中队"]
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name:'资产增加值',
                    type:'line',
                    stack: '总量',
                    data:[200, 132, 101, 134, 90, 230, 210, 120, 132, 101, 134, 90],
                    smooth: true
                },
                {
                    name:'资产减少值',
                    type:'line',
                    stack: '总量',
                    data:[100, 182, 191, 154, 167, 135, 154, 154, 134, 187, 123, 178],
                    smooth: true
                },
                {
                    name:'资产总价值',
                    type:'line',
                    stack: '总量',
                    data:[500, 600, 489, 589, 456, 645, 489, 589, 567, 389, 365, 589],
                    smooth: true
                },
            ]
        };
        return (
          <Echarts option={option} height={300} style={{backgroundColor: "red"}} />
        );
    }
}

class HomePieCharts1 extends React.Component {
    render() {
        const option = {
            title: {
                text: '各单位资产数量(个)',
                textStyle: {
                    fontSize: 14
                }
            },
            tooltip: {},
            legend: {
                data:["支队机关","特宿区大队","宿豫区大队","湖滨新城大队","开发区大队","苏宿园区大队","洋河新城大队","沐阳县大队","泗洪县大队", "泗阳县大队","战勤保障大队","特勤中队"],
                bottom: 10,
                orient: "horizontal",
                itemGap: 5,
                textStyle: {
                    rich: {
                        width: 100
                    },
                }
            },
            toolbox: {
            },
            series: [
                {
                    type:'pie',
                    radius: ['25%', '58%'],
                    center: ["50%", "38%"],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: false,
                            textStyle: {
                                fontSize: '20',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: true
                        }
                    },
                    data:[
                        {value:335, name:'支队机关'},
                        {value:310, name:'特宿区大队'},
                        {value:234, name:'宿豫区大队'},
                        {value:235, name:'湖滨新城大队'},
                        {value:335, name:'开发区大队'},
                        {value:435, name:'苏宿园区大队'},
                        {value:135, name:'洋河新城大队'},
                        {value:235, name:'沐阳县大队'},
                        {value:335, name:'泗洪县大队'},
                        {value:235, name:'泗阳县大队'},
                        {value:335, name:'战勤保障大队'},
                        {value:548, name:'特勤中队'}
                    ]
                }
            ]
        };
        return (
          <Echarts option={option} height={350} style={{backgroundColor: "red"}} />
        );
    }
}

class HomePieCharts2 extends React.Component {
    render() {
        const option = {
            title: {
                text: '各科目资产数量(个)',
                textStyle: {
                    fontSize: 14
                }
            },
            tooltip: {},
            legend: {
                data:["人员防护装备","灭火器材装备","抢险救援装备","消防通信指挥装备","消防车辆","办公用品","房屋建筑","土地"],
                bottom: 10,
                orient: "horizontal",
                itemGap: 5,
                textStyle: {
                    rich: {
                        width: 100
                    },
                }
            },
            toolbox: {
            },
            series: [
                {
                    type:'pie',
                    radius: ['25%', '58%'],
                    center: ["50%", "38%"],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: false,
                            textStyle: {
                                fontSize: '20',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: true
                        }
                    },
                    data:[
                        {value:335, name:'人员防护装备'},
                        {value:310, name:'灭火器材装备'},
                        {value:234, name:'抢险救援装备'},
                        {value:235, name:'消防通信指挥装备'},
                        {value:335, name:'消防车辆'},
                        {value:435, name:'办公用品'},
                        {value:135, name:'房屋建筑'},
                        {value:235, name:'土地'}
                    ]
                }
            ]
        };
        return (
          <Echarts option={option} height={350} style={{backgroundColor: "red"}} />
        );
    }
}


export default StackNavigator(
    {
        Home: { 
			screen: HomePage,
			navigationOptions:{
                header:null,
				headerTitle:'首页',
				headerBackTitle:null,
			} 
        },
        Get: {
            screen: GridPage,
			navigationOptions:{
                headerTitle:"资产领用"
            }
        },
        Borrow: {
            screen: GridPage,
			navigationOptions:{
                headerTitle:"资产借用"
            }
        },
        Return: {
            screen: GridPage,
			navigationOptions:{
                headerTitle: "资产转让"
            }
        },
        Change: {
            screen: GridPage,
			navigationOptions:{
                headerTitle: "资产变更"
            }
        },
        Repiar: {
            screen: GridPage,
			navigationOptions:{
                headerTitle: "资产维修"
            }
        },
        Deal: {
            screen: GridPage,
			navigationOptions:{
                headerTitle: "资产报废"
            }
        },
        Search: {
            screen: GridPage,
			navigationOptions:{
                headerTitle: "资产自查"
            }
        },
        Mine: {
            screen: GridPage,
			navigationOptions:{
                headerTitle: "我的资产"
            }
        },

        Apply: {
            screen: ApplyPage,
            navigationOptions:{
                headerTitle: "领用"
            }
        },
        Fix: {
            screen: FixPage,
            navigationOptions:{
                headerTitle: "维修"
            }
        },
        Commonlist: {
            screen: CommonList,
            navigationOptions:{
                headerTitle: "请选择"
            }
        },
        Scrap: {
            screen: ScrapPage,
            navigationOptions:{
                headerTitle: "报废"
            }
        }
    },
    {
		initialRouteName: 'Home',
		mode: "card",
		headerMode: 'screen',
		headerBackTitle: "返回"
	}
)

const style = StyleSheet.create({
    homeHeaderView: {
        height: 250,
    },
    homeHeaderTitle:{
        fontSize: 20, 
        color: "white", 
        paddingTop: 15, 
        alignSelf: "center"
    },
    homeHeaderAvater: {
        // alignSelf:'center',s
        width: 150,
        fontSize: 18, 
        color: "black", 
        top: 150, left: 40
    },
    homeHeaderBg: {
        width: '100%', 
        height: 250, 
        position: 'absolute', 
        top:0, bottom:0, left:0, right:0 ,
    },
    homeHeaderIcon: {
        width: 100, 
        height: 100, 
        position: 'absolute', 
        top: 70, left: 40
    }
})