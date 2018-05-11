export default function gridReducer(state = {rows:[],token:"", dept:[], user:[], msg:""}, action) {
    // console.log(action.type, action)
    switch (action.type) {
      case "GET_NEW_DATA":
        return {...state, rows:action.rows, token: action.token };break
      case "GET_DEPT_LIST":
        return{...state, dept:action.dept, token: action.token };break
      case "GET_USER_LIST":
        return{...state, user:action.user, token: action.token };break
      case "SUBMIT_APPLY":
        return{...state, user:action.msg, token: action.token };break
      case "SUBMIT_FIX":
        return{...state, user:action.msg, token: action.token };break
      case "SUBMIT_SCRAP":
        return{...state, user:action.msg, token: action.token };break
      case "SUBMIT_MAKE_OVER":
        return{...state, user:action.msg, token: action.token };break
       
      default:
        return {...state}
    }
  }