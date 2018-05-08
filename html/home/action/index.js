const getNewDataAction = (rows, token) => ({type: "GET_NEW_DATA",rows,token})

const getDeptAction = (data, token) => ({type: "GET_DEPT_LIST",data,token})

const getUserAction = (data, token) => ({type: "GET_USER_LIST",data,token})

export const getNewData= (url,params)=>(dispatch, getState) => {
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
            .catch((error)=> console.log("failed"))
    )
}

export const getDeptList = (url,params) => (dispatch, getState) => {
    var formData = new FormData();  
    for(let k in params){  
        formData.append(k, params[k]);  
    }  
    // console.log(formData)
    dispatch( 
        dispatch=>
            fetch(url,{
                method: 'POST',
                body: formData
            })
            .then((response)=> response.json())
            .then((responseText)=>{
                // console.log("responseText",responseText)
                dispatch(getDeptAction(responseText.data, responseText.token))  
            })
            .catch((error)=> console.log(error,"failed"))
    )
}

export const getUserList = (url,params) => (dispatch, getState) => {
    var formData = new FormData();  
    for(let k in params){  
        formData.append(k, params[k]);  
    }  
    // console.log(formData)
    dispatch( 
        dispatch=>
            fetch(url,{
                method: 'POST',
                body: formData
            })
            .then((response)=> response.json())
            .then((responseText)=>{
                // console.log("responseText",responseText)
                dispatch(getUserAction(responseText.data, responseText.token))  
            })
            .catch((error)=> console.log(error,"failed"))
    )
}