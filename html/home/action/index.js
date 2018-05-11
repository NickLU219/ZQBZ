const getNewDataAction = (rows, token) => ({type: "GET_NEW_DATA",rows,token})

const getDeptAction = (dept, token) => ({type: "GET_DEPT_LIST",dept,token})

const getUserAction = (user, token) => ({type: "GET_USER_LIST",user,token})

const submitApplyAction = (msg, token) => ({type: "SUBMIT_APPLY",msg,token})

const submitFixAction = (msg, token) => ({type: "SUBMIT_FIX",msg,token})

const submitScrapAction = (msg, token) => ({type: "SUBMIT_SCRAP",msg,token})

const SubmitMakeOverAction = (msg, token) => ({type: "SUBMIT_MAKE_OVER",msg,token})

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
                console.log("responseText",responseText)
                dispatch(getNewDataAction(responseText.pageUtils.rows, responseText.token))  
            })
            .catch((error)=> console.log("failed",error))
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
                let dept = responseText.data
                for (i in dept) {
                    dept[i].value = dept[i]["odId"]
                    dept[i].label = dept[i]["odName"]
                    if (dept[i].children.length>0) {
                        let dept2 = dept[i].children
                        for (i in dept2) {
                            dept2[i].value = dept2[i]["odId"]
                            dept2[i].label = dept2[i]["odName"]
                            if (dept2[i].children.length>0) {
                                let dept3 = dept2[i].children
                                for (i in dept3) {
                                    dept3[i].value = dept3[i]["odId"]
                                    dept3[i].label = dept3[i]["odName"]
                                }
                            }
                        }
                    }
                }
                dispatch(getDeptAction(dept, responseText.token))  
                // dispatch(getDeptAction(responseText.data, responseText.token))  
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
                // console.log("getUserList",responseText)
                let user = responseText.data
                for (i in user) {
                    user[i].label = user[i]["oeName"]
                    user[i].value = user[i]["oeId"]
                }
                dispatch(getUserAction(user, responseText.token))  
            })
            .catch((error)=> console.log(error,"failed"))
    )
}

export const SubmitApply = (url,params) => (dispatch, getState) => {
    var formData = new FormData();  
    for(let k in params){  
        formData.append(k, params[k]);  
    }  
    console.log(formData)
    dispatch( 
        dispatch=>
            fetch(url,{
                method: 'POST',
                body: formData
            })
            .then((response)=> response.json())
            .then((responseText)=>{
                console.log("responseText",responseText)
                dispatch(submitApplyAction(responseText.msg,responseText.token))  
            })
            .catch((error)=> console.log(error,"failed"))
    )
}

export const SubmitFix = (url,params) => (dispatch, getState) => {
    var formData = new FormData();  
    for(let k in params){  
        formData.append(k, params[k]);  
    }  
    console.log(formData)
    dispatch( 
        dispatch=>
            fetch(url,{
                method: 'POST',
                body: formData
            })
            .then((response)=> response.json())
            .then((responseText)=>{
                console.log("responseText",responseText)
                dispatch(submitFixAction(responseText.msg,responseText.token))  
            })
            .catch((error)=> console.log(error,"failed"))
    )
}

export const SubmitScrap = (url,params) => (dispatch, getState) => {
    var formData = new FormData();  
    for(let k in params){  
        formData.append(k, params[k]);  
    }  
    console.log(formData)
    dispatch( 
        dispatch=>
            fetch(url,{
                method: 'POST',
                body: formData
            })
            .then((response)=> response.json())
            .then((responseText)=>{
                console.log("responseText",responseText)
                dispatch(submitScrapAction(responseText.msg,responseText.token))  
            })
            .catch((error)=> console.log(error,"failed"))
    )
}

export const SubmitMakeOver = (url,params) => (dispatch, getState) => {
    var formData = new FormData();  
    for(let k in params){  
        formData.append(k, params[k]);  
    }  
    console.log(formData)
    dispatch( 
        dispatch=>
            fetch(url,{
                method: 'POST',
                body: formData
            })
            .then((response)=> response.json())
            .then((responseText)=>{
                console.log("responseText",responseText)
                dispatch(SubmitMakeOverAction(responseText.msg,responseText.token))  
            })
            .catch((error)=> console.log(error,"failed"))
    )
}