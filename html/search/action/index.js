const getNewDataAction = (rows) => ({type: "GET_NEW_DATA",rows})

export const getNewData= (url,params)=>(dispatch, getState) => {
    dispatch( 
        dispatch=>
            fetch(url,{
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(params)
            })
            .then((response)=> response.json())
            .then((responseText)=>{
                dispatch(getNewDataAction(responseText.rows))  
            })
            .catch((error)=> console.log(error,"failed"))
    )
}
