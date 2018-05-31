import React from 'react';
import { Card, WhiteSpace, Grid, List } from 'antd-mobile';
import { Text, View, SafeAreaView, ScrollView, Image, StyleSheet, Platform, ActivityIndicator } from 'react-native'
import { DeviceId } from '../../utils/devInfo'
// import Echarts from 'native-echarts'
import {Echarts, echarts} from 'react-native-secharts';
import { StackNavigator } from 'react-navigation';
// import MainTabbar from '../../basic/js/MainTabbar'
import GridPage from './gridPage'
import ApplyPage from './applyPage';
import FixPage from './fixPage'
import ScrapPage from './scrapPage'
import ChangePage from './change'
import MakeOverPage from './makeover'
import InfoPage from '../../search/js/infoPage'
import { connect } from 'react-redux'
import {getBIData} from '../action'

const Item = List.Item;
const Brief = Item.Brief;
import API from '../../utils/apiMap'

class HomePage extends React.Component {
    constructor(props) {
        super(props)
        
    }
    componentWillMount(){
        const {getBIData, userinfo, token} = this.props
        // console.log(userinfo)
        getBIData(API.home_bi, {token: token, aiUseDw: userinfo.odDwId})
    }
    render() {
        const lrId = this.props.userinfo.lrId
        switch(lrId) {
            case 'app_admin': {
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
                            <HomeGrid props={{...this.props}} usertype={{lrId}} />
                            <WhiteSpace />
                            <WhiteSpace />
                        </ScrollView>
                    </View>
                )
            }
            case 'app_leader':{
                if (this.props.option.hasOwnProperty("Anum"))
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
                                <HomeGrid props={{...this.props}} usertype={{lrId}}/>
                                <WhiteSpace />
                                <WhiteSpace />
                                <HomeLineCharts props={{...this.props}} />
                                <WhiteSpace />
                                <HomePieCharts1 props={{...this.props}} />
                                <WhiteSpace />
                                <HomePieCharts2 props={{...this.props}} />
                            </ScrollView>
                        </View>
                    );
                else {
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
                                <HomeGrid props={{...this.props}} usertype={{lrId}} />
                                <WhiteSpace />
                                <WhiteSpace />
                                <ActivityIndicator />
                            </ScrollView>
                        </View>
                    )
                }
            }
            case 'app_emp': {
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
                            <HomeGrid props={{...this.props}} usertype={{lrId}} />
                            <WhiteSpace />
                            <WhiteSpace />
                        </ScrollView>
                    </View>
                )
            }
        }
    }
}

const HomePageContainer = connect(
    (state) => ({
        userinfo: state.homeReducer.userinfo,
        token : state.homeReducer.token,
        option : state.gridReducer.option
    }),
    dispatch => ({
        getBIData: (url, params) => dispatch(getBIData(url, params))
    })
)(HomePage)

class HomeHeader extends React.Component {
    render() {
        const {userinfo} = this.props
        return (
            <View style={style.homeHeaderView}>
                <Image source={require('../img/top_bg.png')} style={style.homeHeaderBg} />
                {/* <Text style={style.homeHeaderTitle}>首页</Text> */}
                <Image source={require('../img/home_icon.png')} style={style.homeHeaderIcon} />
                <Text style={style.homeHeaderAvater}>{userinfo.oeName}({userinfo.oeCode})</Text>
            </View>
        );
    }
}
const HomeHeaderComponent = connect(
    state=>(
        {userinfo: state.homeReducer.userinfo}
    )
)(HomeHeader)

class HomeGrid extends React.Component {
    constructor(props) {
        super(props)
    }
    _gridJump = (el, index) => {
        switch (el.text) {
            case "资产领用": this.props.props.navigation.navigate("Get", {key: "Get"});break;            
            case "资产转让": this.props.props.navigation.navigate("Return", {key: "Return"});break;
            case "资产变更": this.props.props.navigation.navigate("Change", {key: "Change"});break;
            case "资产维修": this.props.props.navigation.navigate("Repiar", {key: "Repiar"});break;
            case "资产报废": this.props.props.navigation.navigate("Deal", {key: "Deal"});break;
            case "资产自查": this.props.props.navigation.navigate("Search", {key: "Search"});break;
            case "我的资产": this.props.props.navigation.navigate("Mine", {key: "Mine"});break;
        }
    }
    render() {
        let data = [
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
        ]
        switch(this.props.usertype.lrId) {
            case 'app_admin': data = data;break
            case 'app_leader': data = data.filter((item)=> item.text == '资产自查'|item.text == '我的资产');break
            case 'app_emp': data = data.filter((item)=> item.text == '资产自查'|item.text == '我的资产');break
        }
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
        const {AxAxis , Anum} = this.props.props.option
        const option = {
            title: {
                text: '宿迁消防支队各单位资产数量',
                textStyle: {
                    fontSize: 14
                }
            },
            tooltip: {},
            legend: {
                data:['资产总数'],
                right: 20,
                width: 50,
                orient: "vertical",
                itemGap: 5
            },
            grid: {
                left: 10,
                right: 10,
                bottom: 60,
                containLabel: true
            },
            toolbox: {
            },
            xAxis: {
                name: "单位",
                axisLabel:{
                    interval: 0,
                    rotate: 90
                },
                type: 'category',
                boundaryGap: true,
                data: AxAxis
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name:'资产总数',
                    type:'line',
                    stack: '总量',
                    data:Anum,
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
        const {AxAxis , Aprice} = this.props.props.option
        const option = {
            title: {
                text: '各单位资产价值',
                textStyle: {
                    fontSize: 14
                }
            },
            tooltip: {},
            legend: {
                data:AxAxis,
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
                    data:Aprice
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
        const {BxAxis , Bprice} = this.props.props.option
        const option = {
            title: {
                text: '资产资金来源',
                textStyle: {
                    fontSize: 14
                }
            },
            tooltip: {},
            legend: {
                data:BxAxis,
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
                    data:Bprice
                }
            ]
        };
        return (
          <Echarts option={option} height={350} style={{backgroundColor: "red"}} />
        );
    }
}

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
        top: 180, left: 40
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

export default StackNavigator(
    {
        Main: { 
			screen: HomePageContainer,
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
        Scrap: {
            screen: ScrapPage,
            navigationOptions:{
                headerTitle: "报废"
            }
        },
        ChangeAction: {
            screen: ChangePage,
            navigationOptions:{
                headerTitle: "变更"
            }
        },
        Makeover: {
            screen: MakeOverPage,
            navigationOptions:{
                headerTitle: "转让"
            }
        },
        Info: { 
			screen: InfoPage,
			navigationOptions:{
				headerTitle:'资产信息',
				headerBackTitle:null,
			}
		},
    },
    {
		initialRouteName: 'Main',
		mode: "card",
		headerMode: 'screen',
		headerBackTitle: "返回"
	}
)