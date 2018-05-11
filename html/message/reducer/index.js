export default function messageReducer(state = {}, action) {
    switch (action.type) {
      case "GET_DATA":
        return {...state, token: action.token, rows: action.rows };break
      default:
        return {...state}
    }
  }