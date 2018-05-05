export default function gridReducer(state = {rows:[]}, action) {
    // console.log(action.type, action.rows)
    switch (action.type) {
      case "GET_NEW_DATA":
        return {...state, rows:action.rows }
      default:
        return {...state}
    }
  }