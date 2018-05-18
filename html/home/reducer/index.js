export default function gridReducer(state = {rows:[],token:"", dept:[], user:[], place: [], msg:"", option: {}}, action) {
    console.log(action.type, action)
    switch (action.type) {
      case "GET_NEW_DATA":
        return {...state, rows:action.rows, token: action.token };break
      case "GET_DEPT_LIST":
        return{...state, dept:action.dept, token: action.token };break
      case "GET_USER_LIST":
        return{...state, user:action.user, token: action.token };break
      case "GET_PLACE_LIST":
        return{...state, place:action.place, token: action.token };break
      case "SUBMIT_APPLY":
        return{...state, msg:action.msg, token: action.token };break
      case "SUBMIT_FIX":
        return{...state, msg:action.msg, token: action.token };break
      case "SUBMIT_SCRAP":
        return{...state, msg:action.msg, token: action.token };break
      case "SUBMIT_MAKE_OVER":
        return{...state, msg:action.msg, token: action.token };break
      case "SUBMIT_CHANGE":
        return{...state, msg:action.msg, token: action.token };break
      case "CLEAR_MSG":
        return{...state, msg:action.msg };break
      case "GET_BI_DATA":
        return{...state, option:action.option, token: action.token };break
        
      default:
        return {...state}
    }
  }