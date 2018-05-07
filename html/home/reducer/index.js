export default function gridReducer(state = {rows:[],token:""}, action) {
    console.log(action.type, action)
    switch (action.type) {
      case "GET_NEW_DATA":
        return {...state, rows:action.rows, token: action.token }
      default:
        return {...state}
    }
  }