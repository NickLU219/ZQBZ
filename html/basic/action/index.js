const UserLogin = (userinfo,token,login) => ({type: "LOGIN",userinfo, token, login})

export const doUserLogin= (url,params)=>(dispatch, getState) => {
    let formData = new FormData();  
    for(let k in params){  
        formData.append(k, params[k]);  
    }  
    let searchData = "?"
    for (let k in params) {
        searchData+= k + "=" + params[k]
    }
    console.log(searchData)
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
                console.log(responseText)
                dispatch(UserLogin(responseText.data, responseText.token, true))  
            })
            .catch((error)=> {
                console.log(error)
                dispatch(UserLogin({}, "",false))  
            })
            // fetch(url+searchData)
            // .then(response=>response.json())
            // .then(responseText=>dispatch(UserLogin(responseText.data, responseText.token, true)) )
            // .catch(error=>dispatch(UserLogin({}, "",false)))
    )
}
