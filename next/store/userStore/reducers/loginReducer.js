import { userState } from "../userState";

export const loginReducer = (state = userState, action) => {
  switch (action.type) {
    case "LOGIN_ACTION": {
      return {
        ...state,
        login: action.payload.login,
        password: action.payload.password,
        token: action.payload.token,
      };
    }
    case "LOGOUT_ACTION": {
    }
    default:
      return state;
  }
};
