export default function searchReducer(state = {rows:[],data:[],token:"",info:[],path:"",total:""}, action) {
    // console.log(action.type, action.info)
    switch (action.type) {
      case "GET_NEW_DATA":
        return {...state, rows:action.rows, token: action.token, total: action.total }
      case "GET_INFO":
        return {...state, data:action.data, token: action.token }
      case "GET_INFO_LIST":
        return {...state, info:action.info, token: action.token }
      case "GET_PZ":
        return {...state, path:action.path }
        
      default:
        return {...state}
    }
  }