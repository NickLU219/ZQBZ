export default function homeReducer(state = {userinfo:{},token:"",login:false}, action) {
    console.log(action.type,action.token, action.login)
    switch (action.type) {
      case "LOGIN":
        return {...state, userinfo:action.userinfo, token: action.token, login: action.login }
      default:
        return {...state}
    }
  }