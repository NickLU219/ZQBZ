export default function homeReducer(state = {userinfo:{},token:"",login:false, msg:""}, action) {
    switch (action.type) {
      case "LOGIN":
        return {...state, userinfo:action.userinfo[0], token: action.token, login: action.login }
      case "USER_CHECK_FAIL":
        return {...state, msg:action.msg }
      case "CLEAR_MSG":
        return {...state, msg:action.msg }
        
      default:
        return {...state}
    }
  }