const getNewDataAction = (rows, token) => ({type: "GET_NEW_DATA",rows,token})

const getInfoAction = (data, token) => ({type: "GET_INFO", data, token})

const getInfoListAction = (info, token) => ({type: "GET_INFO_LIST", info, token})


export const getNewData= (url,params)=>(dispatch, getState) => {
    // console.log(url, params)
    var formData = new FormData();  
    for(let k in params){  
        formData.append(k, params[k]);  
    }  
    dispatch( 
        dispatch=>
            fetch(url,{
                method: 'POST',
                body: formData
            })
            .then((response)=> response.json())
            .then((responseText)=>{
                // console.log("responseText",responseText)
                dispatch(getNewDataAction(responseText.pageUtils.rows, responseText.token))  
            })
            .catch((error)=> console.log(error,"failed"))
    )
}

export const getInfo= (url,params)=>(dispatch, getState) => {
    // console.log("url:",url,"params:", params)
    var formData = new FormData();  
    for(let k in params){  
        formData.append(k, params[k]);  
    }  
    dispatch( 
        dispatch=>
            fetch(url,{
                method: 'POST',
                body: formData
            })
            .then((response)=> response.json())
            .then((responseText)=>{
                dispatch(getInfoAction(responseText.data, responseText.token))  
            })
            .catch((error)=> console.log(error,"failed"))
    )
}

export const getInfoList= (url,params)=>(dispatch, getState) => {
    // console.log("url:",url,"params:", params)
    var formData = new FormData();  
    for(let k in params){  
        formData.append(k, params[k]);  
    }  
    dispatch( 
        dispatch=>
            fetch(url,{
                method: 'POST',
                body: formData
            })
            .then((response)=> response.json())
            .then((responseText)=>{
                // console.log("getinfolist",responseText.pageUtils.rows)
                dispatch(getInfoListAction(responseText.pageUtils.rows, responseText.token))  
            })
            .catch((error)=> console.log(error,"failed"))
    )
}
