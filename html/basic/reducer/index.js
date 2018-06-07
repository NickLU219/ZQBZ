export default function homeReducer(state = {userinfo:{},token:"",login:false, msg:"", path:""}, action) {
    switch (action.type) {
      case "LOGIN":
        return {...state, userinfo:action.userinfo[0], token: action.token, login: action.login }
      case "USER_LOGIN_FAIL":
        return {...state, msg:action.msg }
      case "CLEAR_MSG":
        return {...state, msg:action.msg }
      case "UPDATE_CHECK":
        return {...state, path:action.path }
       
      default:
        return {...state}
    }
  }