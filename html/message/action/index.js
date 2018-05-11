const getDataAction = (rows, token) => ({type: "GET_DATA",rows,token})

export const getData= (url,params)=>(dispatch, getState) => {
    console.log(url, params)
    let formData = new FormData();  
    for(let k in params){  
        formData.append(k, params[k]);  
    }  
    dispatch( 
        dispatch=>
            fetch(url, {
                method: 'POST',
                // cache: 'no-cache',
                body: formData
            })
            .then((response)=> (
                response.json()
            ))
            .then((responseText)=>{
                console.log(responseText)
                dispatch(getDataAction(responseText.pageUtils.rows, responseText.token))  
            })
            .catch((error)=> {
                console.log(error)
                // dispatch(UserLogin({}, "",false))  
            })
    )
}
