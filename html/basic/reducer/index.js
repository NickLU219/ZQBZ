export default function homeReducer(state = {userinfo:{},token:"",login:false}, action) {
    switch (action.type) {
      case "LOGIN":
        return {...state, userinfo:action.userinfo[0], token: action.token, login: action.login }
      default:
        return {...state}
    }
  }