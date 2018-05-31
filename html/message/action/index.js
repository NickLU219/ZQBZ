const getDataAction = (total, rows, token) => ({type: "GET_DATA",total,rows,token})

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
                console.log(getState().messageReducer.rows)
                let rows = []
                if (params["start"] == 1)
                    rows = responseText.pageUtils.rows
                else {
                    rows = getState().messageReducer.rows.concat(responseText.pageUtils.rows)
                }
                dispatch(getDataAction(responseText.pageUtils.total, rows, responseText.token))  
            })
            .catch((error)=> {
                console.log(error)
            })
    )
}
