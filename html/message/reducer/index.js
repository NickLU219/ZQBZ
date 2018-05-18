export default function messageReducer(state = {rows:[], token:"",total:0}, action) {
    switch (action.type) {
      case "GET_DATA":
        return {...state, token: action.token, rows: action.rows, total:action.total };break
      default:
        return {...state}
    }
  }