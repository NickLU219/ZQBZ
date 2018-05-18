const getNewDataAction = (total, rows, token) => ({type: "GET_NEW_DATA", total, rows, token})

const getInfoAction = (data, token) => ({type: "GET_INFO", data, token})

const getInfoListAction = (info, token) => ({type: "GET_INFO_LIST", info, token})

const getPZAction = (path) => ({type: "GET_PZ", path})

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
                console.log("responseText",responseText.pageUtils)
                let rows = []
                if (params["start"] == 1)
                    rows = responseText.pageUtils.rows
                else {
                    rows = getState().messageReducer.rows.concat(responseText.pageUtils.rows)
                }
                dispatch(getNewDataAction(responseText.pageUtils.total, rows, responseText.token))  
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

export const getPZ= (url,params)=>(dispatch, getState) => {
    // console.log("url:",url,"params:", params)
    var formData = new FormData();  
    for(let k in params){  
        formData.append(k, params[k]);  
    }  
    console.log(url, formData)
    dispatch( 
        dispatch=>
            fetch(url,{
                method: 'POST',
                headers: {
                    "Content-type": "application/x-www-form-urlencoded; charset=UTF-8" 
                  },
                body: "cmd=getinfo&file_id="+params["file_id"]
            })
            .then((response)=> response.text())
            .then((responseText)=>{
                // console.log("getPZ",responseText)
                const path = responseText.split(',')[0].replace(/"|\\|\[|!/g,"")
                console.log(path)
                dispatch(getPZAction(path))  
            })
            .catch((error)=> console.log(error,"failed"))
    )
}