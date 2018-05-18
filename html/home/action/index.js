const getNewDataAction = (rows, token) => ({type: "GET_NEW_DATA",rows,token})

const getDeptAction = (dept, token) => ({type: "GET_DEPT_LIST",dept,token})

const getUserAction = (user, token) => ({type: "GET_USER_LIST",user,token})

const getPlaceAction = (place, token) => ({type: "GET_PLACE_LIST",place,token})

const submitApplyAction = (msg, token) => ({type: "SUBMIT_APPLY",msg,token})

const submitFixAction = (msg, token) => ({type: "SUBMIT_FIX",msg,token})

const submitScrapAction = (msg, token) => ({type: "SUBMIT_SCRAP",msg,token})

const submitMakeOverAction = (msg, token) => ({type: "SUBMIT_MAKE_OVER",msg,token})

const submitChangeAction = (msg, token) => ({type: "SUBMIT_CHANGE",msg,token})

const getBIDataAction = (option, token) => ({type: "GET_BI_DATA", option, token})

export const ClearMsg = (msg) => ({type: "CLEAR_MSG",msg})

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

export const getPlaceList = (url,params) => (dispatch, getState) => {
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
                // console.log("getPlaceList",responseText)
                let place = responseText.pageUtils.rows
                for (i in place) {
                    place[i].label = place[i]["apiName"]
                    place[i].value = place[i]["apiId"]
                }
                dispatch(getPlaceAction(place, responseText.token))  
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
                dispatch(submitMakeOverAction(responseText.msg,responseText.token))  
            })
            .catch((error)=> console.log(error,"failed"))
    )
}

export const SubmitChange = (url,params) => (dispatch, getState) => {
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
                dispatch(submitChangeAction(responseText.msg,responseText.token))  
            })
            .catch((error)=> console.log(error,"failed"))
    )
}

export const getBIData = (url, params) => (dispatch, getState) => {
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
                const data = responseText.data
                const AxAxis = [], Anum = [], Aprice = []
                for (let i = 0; i < data[0].length;i++) {
                    AxAxis.push(data[0][i]["dwName"])
                    Anum.push(data[0][i]["total"])
                    Aprice.push({value:data[0][i]["price"], name:data[0][i]["dwName"]})
                }
                const BxAixs = [], Bprice = []
                for (let j = 0; j < data[1].length; j++) {
                    BxAixs.push(data[1][j]["finKmName"])
                    Bprice.push({value:data[1][j]["fee"], name:data[1][j]["finKmName"]})
                }
                const option = {
                    AxAxis,Anum,Aprice,BxAixs,Bprice
                }
                
                dispatch(getBIDataAction(option,responseText.token))  
            })
            .catch((error)=> console.log(error,"failed"))
    )
}