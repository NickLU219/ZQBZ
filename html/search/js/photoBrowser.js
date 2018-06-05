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
        // if(file_id.indexOf(",")>0){
        //     const files = file_id.split(",")
        //     files.forEach(element => {
        //         getPZ(API.lesFile, {cmd:"getinfo", file_id:file_id})
        //     });
        // }else{
        //     getPZ(API.lesFile, {cmd:"getinfo", file_id:file_id})
        // }
        getPZ(API.lesFile, {file_id:file_id})
    }

    render() {
        const {path } = this.props
        if(path !== ""){
            paths = path.split(",")
            const media =paths.map( (item) =>
                ({
                  photo: API.lesPZ+ item,
                })
            )
            return (
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