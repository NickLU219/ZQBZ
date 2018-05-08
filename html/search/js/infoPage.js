import React from 'react';
import { View , Text, ScrollView} from 'react-native';
import { Tabs, List } from 'antd-mobile'
import API from '../../utils/apiMap'
import { connect} from 'react-redux'

import { getInfo } from '../action' 

class InfoPage  extends React.Component {
    constructor(props) {
        super(props)
        const {key} = this.props.navigation.state.params
        const { getInfo, token }= this.props
        // console.log(this.props.navigation)
        getInfo(API.zichan_info, {aiId: key, token})

    }
    tabs = [
        { title: '基本信息' },
        { title: '领用记录' },
        { title: '维修信息' },
    ]
    render() {
        const {data} = this.props
        // console.log(data)
        renderdata = (data) =>{
            let pages = []
            for (k in data[0]){
                // console.log(k,data[0][k])
                pages.push(<Text><Text>{data[0][k]}</Text></Text>)
            }
            return pages
        }
        return <Tabs tabs={this.tabs}
                    initalPage={'0'}
                >
                    <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: "100%", backgroundColor: '#fff' }}>
                        <ScrollView style={{width: "100%", bottom: 44}}>
                        {renderdata(data).map((d)=>d)}
                        </ScrollView>
                    </View>
                    
                    <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: "100%", backgroundColor: '#fff' }}>
                    Content of second tab
                    </View>
                    <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: "100%", backgroundColor: '#fff' }}>
                    Content of third tab
                    </View>
                </Tabs>
    }
}

export default connect(
    (state)=> ({
        token: state.searchReducer.token,
        data: state.searchReducer.data
    }),
    (dispatch)=>({
		getInfo: (url,params) => {dispatch(getInfo(url,params))}
	})
)(InfoPage)