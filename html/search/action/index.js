const getNewDataAction = (rows, token) => ({type: "GET_NEW_DATA",rows,token})

export const getNewData= (url,params)=>(dispatch, getState) => {
    console.log(url, params)
    var formData = new FormData();  
    for(let k in params){  
        formData.append(k, params[k]);  
    }  
    dispatch( 
        dispatch=>
            fetch(url,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: formData
            })
            .then((response)=> response.json())
            .then((responseText)=>{
                console.log("responseText",responseText)
                dispatch(getNewDataAction(responseText.pageUtils.rows, responseText.token))  
            })
            .catch((error)=> console.log(error,"failed"))
    )
}
