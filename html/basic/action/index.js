const UserLogin = (userinfo,token,login) => ({type: "LOGIN",userinfo, token, login})

const UserCheck = () => ({})

const UserCheckFail = (msg) => ({type: "USER_CHECK_FAIL", msg})

export const ClearMsg = () => ({type: "CLEAR_MSG",msg:""})

export const doUserLogin= (url,params)=>(dispatch, getState) => {
    let formData = new FormData();  
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
                dispatch(UserLogin(responseText.data, responseText.token, true))  
            })
            .catch((error)=> {
                console.log(error)
                dispatch(UserLogin({}, "",false))  
            })
    )
}

export const doUserCheck = (url,params)=>(dispatch, getState) => {
    let formData = new FormData();  
    for(let k in params){  
        formData.append(k, params[k]);  
    }  
    console.log(formData)
    dispatch( 
        dispatch=>
            fetch(url, {
                method: 'POST',
                cache: 'no-cache',
                body: formData
            })
            .then((response)=> (
                response.text()
            ))
            .then((responseText)=>{
                console.log(responseText)
                if(responseText === 1)
                    dispatch(doUserLogin(API.user_login, {oeCode:8670}))
                else if (responseText === 0) 
                    dispatch(UserCheckFail("用户名密码错误!"))
                else if (responseText === -1)
                    dispatch(UserCheckFail("登录失败，接口异常!"))
                // dispatch(UserCheck(responseText.data, responseText.token, true))  
            })
            .catch((error)=> {
                console.log(error)
                // dispatch(UserLogin({}, "",false))  
                dispatch(UserCheckFail("登录失败，接口异常!"))
            })
    )
}