export default function gridReducer(state = {rows:[],token:""}, action) {
    console.log(action.type, action)
    switch (action.type) {
      case "GET_NEW_DATA":
        return {...state, rows:action.rows, token: action.token };break
      case "GET_DEPT_LIST":
        return{...state, data:action.data, token: action.token };break
      case "GET_USER_LIST":
        return{...state, data:action.data, token: action.token };break
        
      default:
        return {...state}
    }
  }