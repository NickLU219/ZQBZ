import API from '../../utils/apiMap'
import { Platform, Linking } from 'react-native'
import {Brand, DeviceId,DeviceName,SystemName,SystemVersion, UniqueID, AppVersion, BundleId} from '../../utils/devInfo'

const UserLogin = (userinfo,token,login) => ({type: "LOGIN",userinfo, token, login})

const UserLoginFail = (msg) => ({type: "USER_LOGIN_FAIL", msg})

const updateCheckAction = (path) => ({type: "UPDATE_CHECK",path})

export const ClearMsg = () => ({type: "CLEAR_MSG",msg:""})

export const doUserLogin= (url,params)=>(dispatch, getState) => {
    let formData = new FormData();  
    params["oeCode"] = params["userId"]
    params = {...params, brand:Brand, deviceId:UniqueID, deviceName:DeviceId, systemName:SystemName, systemVersion:SystemVersion}
    for(let k in params){  
        formData.append(k, params[k]);  
    }  
    dispatch( 
        dispatch=>
            fetch(url, {
                method: 'POST',
                cache: 'no-cache',
                body: formData
            })
            .then((response)=> (
                response.json()
            ))
            .then((responseText)=>{
                // console.log(responseText)
                if(responseText.code == 500) {
                    dispatch(UserLoginFail(responseText.msg))
                }else{
                    dispatch(UserLogin(responseText.data, responseText.token, true))  
                }
            })
            .catch((error,b)=> {
                console.log(error,b, "fail")
                dispatch(UserLoginFail("登录失败"))  
            })
    )
}

export const doUpdateCheck = (url)=> (dispatch, getState) => {
    let formData = new FormData(); 
    const params = {appOs:SystemName, appId: BundleId, appVersion: AppVersion} 
    for(let k in params){  
        formData.append(k, params[k]);  
    }  
    console.log('checkupdate data',formData)
    dispatch( 
        dispatch=>
            fetch(url, {
                method: 'POST',
                body: formData
            })
            .then((response)=> (
                response.json()
            ))
            .then((responseText)=>{
                console.log("updatecheck",responseText)
                // alert(JSON.stringify( responseText.data[0]))
                if(responseText.data[0].appVersion > AppVersion)
                    dispatch(updateCheckAction(responseText.data[0].fileUrl))
                else 
                    dispatch(updateCheckAction(""))
            })
            .catch((error)=> {
                console.log(error, "fail")
            })
    )
}

export const systemUpdate = (url)=> (dispatch, getState) => {
    // let formData = new FormData(); 
    // const params = {appOs:SystemName, appId: BundleId, appVersion: AppVersion} 
    // for(let k in params){  
    //     formData.append(k, params[k]);  
    // }  
    console.log('systemUpdate',API.API_BASE+url)
    // alert(API.API_BASE+url)
    // url = "/files/app/f68a6c5b-1508-4eb2-a525-a98900084477.apk"
    dispatch( 
        dispatch=>
            Linking.canOpenURL(API.API_BASE+url)
            .then(supported => { 
                if (!supported) { 
                    console.warn("Can/'t handle url: " + API.API_BASE+url); 
                } else { 
                    return Linking.openURL(API.API_BASE+url); 
                } 
            })
            .catch(err => console.error('An error occurred',API.API_BASE+url)) 
                
            
    )
}