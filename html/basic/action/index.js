import API from '../../utils/apiMap'

import {Brand, DeviceId,DeviceName,SystemName,SystemVersion, UniqueID} from '../../utils/devInfo'

const UserLogin = (userinfo,token,login) => ({type: "LOGIN",userinfo, token, login})

const UserLoginFail = (msg) => ({type: "USER_LOGIN_FAIL", msg})

export const ClearMsg = () => ({type: "CLEAR_MSG",msg:""})

export const doUserLogin= (url,params)=>(dispatch, getState) => {
    let formData = new FormData();  
    params["oeCode"] = params["userId"]
    params = {...params, brand:Brand, deviceId:UniqueID, deviceName:DeviceId, systemName:SystemName, systemVersion:SystemVersion}
    for(let k in params){  
        formData.append(k, params[k]);  
    }  
    // console.log(formData)
    
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
                // console.log(error,b, "fail")
                dispatch(UserLoginFail("登录失败"))  
            })
    )
}