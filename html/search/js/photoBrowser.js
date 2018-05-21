import React from 'react';
import { View , Text, ScrollView, ActivityIndicator, Image } from 'react-native';
import { Tabs, List, PickerView, Button } from 'antd-mobile'
import API from '../../utils/apiMap'
import { connect} from 'react-redux'
import PhotoBrowser from 'react-native-photo-browser';

import { getInfo, getInfoList, getPZ } from '../action' 


class PhotoBrowserPage extends React.Component{
    constructor(props) {
        super(props)
        const {getPZ} = this.props
        const {file_id} = this.props.navigation.state.params
        getPZ(API.lesFile, {cmd:"getinfo", file_id:file_id})
    }

    render() {
        const {path } = this.props
        if(path !== ""){
            const media = [
                {
                  photo: API.lesPZ+ path,
                  caption: '凭证',
                }
            ]
            return (

                
                    // <Image
                    // style={{width: "100%", height: 200}}
                    //     source={{uri: API.lesPZ+ path}}
                    //     />

                <PhotoBrowser
                    mediaList={media}
                    initialIndex={0}
                    displayNavArrows={false}
                    displaySelectionButtons={false}
                    displayActionButton={false}
                    startOnGrid={false}
                    enableGrid={false}
                    useCircleProgress={false}
                    onSelectionChanged={()=>{}}
                    onActionButton={()=>{}}
                    alwaysDisplayStatusBar={true}
                    customTitle={(index, rowCount) => `${index} sur ${rowCount}`}
                />
            )
        }
        else
            return <ActivityIndicator />
    }
}

export default connect(
    (state)=> ({
        path : state.searchReducer.path,
    }),
    (dispatch)=>({
        
        getPZ: (url, params) => dispatch(getPZ(url, params))
	})
)(PhotoBrowserPage)