const UserLogin = (userinfo,token,login) => ({type: "LOGIN",userinfo, token, login})

export const doUserLogin= (url,params)=>(dispatch, getState) => {
    var formData = new FormData();  
    for(let k in params){  
        formData.append(k, params[k]);  
    }  
    dispatch( 
        dispatch=>
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: formData
            })
            .then((response)=> (
                response.json()
            ))
            .then((responseText)=>{
                dispatch(UserLogin(responseText.data, responseText.token, true))  
            })
            .catch((error)=> {
                dispatch(UserLogin({}, "",false))  
            })
    )
}
