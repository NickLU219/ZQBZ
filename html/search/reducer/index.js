export default function searchReducer(state = {rows:[],data:[],token:""}, action) {
    // console.log(action.type, action.rows)
    switch (action.type) {
      case "GET_NEW_DATA":
        return {...state, rows:action.rows, token: action.token }
      case "GET_INFO":
        return {...state, data:action.data, token: action.token }
      default:
        return {...state}
    }
  }