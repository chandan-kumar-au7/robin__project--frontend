import axios from "axios";
import setAuthToken from "../helper/setAuthToken";
import jwt_decode from "jwt-decode";
import { SET_USER_LOGGED_IN } from "../actionType";

// =========== It will be imported inside the { PAGES folder } where ever we will be needing {  USER REGISTERATION [ BACKEND ] DATA } =========//
export const userRegisterAction = (data) => {
  return {
    type: "REGISTER_DATA_INTO_REDUX_STORE",
    payload: data,
  };
};

// =========== It will be imported inside the { PAGES folder } where ever we will be needing {  USER LOGIN [ BACKEND ] DATA } =========//
export const userLoginAction = (data) => {
  return {
    type: "LOGIN_DATA_INTO_REDUX_STORE",
    payload: data,
  };
};
// =========== It will be imported inside the { PAGES folder } where ever we will be needing {  USER LOGIN [ BACKEND ] DATA } =========//
export const userLoginSuccessAction = (data) => {
  return {
    type: "LOGIN_SUCCESS_DATA_INTO_REDUX_STORE",
    payload: data,
  };
};

const userLogoutAction = (data) => {
  return {
    type: "SET_USER_LOGGED_IN",
    payload: data,
  };
};

// =========== It will be imported inside the { PAGES folder } where ever we will be needing {  USER USERFORGOTPASSWORD [ BACKEND ] DATA } =========//
export const userForgotPassAction = (data) => {
  return {
    type: "FORGOTPASSWORD_DATA_INTO_REDUX_STORE",
    payload: data,
  };
};

export const userForgotPassOtpVarifyAction = (data) => {
  return {
    type: "FORGOTPASSWORD_OTP_VARIFY_DATA_INTO_REDUX_STORE",
    payload: data,
  };
};

export const userForgotpassNEWCredentialsAction = (data) => {
  return {
    type: "FORGOTPASSWORD_NEW CREDIENTIALS_DATA_INTO_REDUX_STORE",
    payload: data,
  };
};

// =========================================== [ REGISTER ] This is for HITTING [BACKEND] end point =====================================//
export const userRegisterFuncFromUserAction = (
  userRegisterCredentials,
  history
) => {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        method: "Post",
        // url: "http://localhost:5000/users/register",
        url: "https://robin--project-mern-backend.herokuapp.com/users/register",
        data: userRegisterCredentials,
      });
      console.log("data from user action FILE : ", data);
      if (data.success) {
        dispatch(userRegisterAction(data));

        dispatch({
          type: "HAVE_TO_STOP_SPINNER",
        });

        history.push("/login");
        setTimeout(() => {
          dispatch(userRegisterAction({}));
        }, 6000);
      } else {
        dispatch({
          type: "SET_REGISTER_ERRORS",
          payload: data,
        });
        dispatch({
          type: "HAVE_TO_STOP_SPINNER",
        });

        setTimeout(() => {
          dispatch({
            type: "SET_REGISTER_ERRORS",
            payload: {},
          });
        }, 6000);
      }
    } catch (err) {
      // console.log("from catch block");
      dispatch({
        type: "SET_REGISTER_ERRORS",
        payload: err.message,
      });
      // console.log("Error in userRegister Action file ", err.message);
    }
  };
};

// =========================================== [ LOGIN ]This is for HITTING [BACKEND] end point =====================================//
export const userLoginFuncFromUserAction = (userLoginCredentials, history) => {
  return async (dispatch) => {
    dispatch({
      type: "HAVE_TO_LOAD_SPINNER",
    });
    try {
      const { data } = await axios({
        method: "Post",
        // url: "http://localhost:5000/users/login",
        url: "https://robin--project-mern-backend.herokuapp.com/users/login",
        data: userLoginCredentials,
      });
      // console.log("data from user action FILE : ", data);
      if (data.success) {
        dispatch({
          type: "HAVE_TO_STOP_SPINNER",
        });

        const { token } = data;
        localStorage.setItem("userJwtToken", token);

        setAuthToken(token);
        const decoded = jwt_decode(token);

        dispatch(userLoginAction(decoded.user));
        dispatch(userLoginSuccessAction(data));
        // console.log("decoded :::: ", decoded.username);
        history.push("/");

        setTimeout(() => {
          dispatch(userLoginSuccessAction({}));
        }, 6000);
      } else {
        dispatch({
          type: "HAVE_TO_STOP_SPINNER",
        });

        dispatch({
          type: "SET_LOGIN_ERRORS",
          payload: data,
        });

        setTimeout(() => {
          dispatch({
            type: "SET_LOGIN_ERRORS",
            payload: {},
          });
        }, 6000);
      }
    } catch (err) {
      // console.log("from catch block");
      dispatch({
        type: "SET_LOGIN_ERRORS",
        payload: err,
      });
      // console.log("Error in userLogin Action file ", err.message);
    }
  };
};

// =========================================== [ EMAIL SEND  ] This is for HITTING [BACKEND] end point =====================================//
export const userForgotpassFuncFromUserAction = (userForgotpassCredentials) => {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        method: "Post",
        // url: "http://localhost:5000/users/forgotpassword",
        url:
          "https://robin--project-mern-backend.herokuapp.com/users/forgotpassword",
        data: userForgotpassCredentials,
      });
      // console.log("ForgotPAss data from user action FILE : ", data);
      if (data.success) {
        dispatch(userForgotPassAction(data));
        dispatch({
          type: "HAVE_TO_STOP_SPINNER",
        });
      } else {
        dispatch({
          type: "SET_CHANGE_PASSWORD_ERRORS",
          payload: data,
        });

        dispatch({
          type: "HAVE_TO_STOP_SPINNER",
        });
      }
    } catch (err) {
      // console.log("from catch block");
      dispatch({
        type: "SET_CHANGE_PASSWORD_ERRORS",
        payload: err,
      });
      // console.log("Error in USERPASSWORD Action file ", err.message);
    }
  };
};

// =========================================== [ OTP VARIFY ] This is for HITTING [BACKEND] end point =====================================//
export const userForgotPassOtpVarifyFuncFromUserAction = (
  userForgotpassOTPAsCredentials
) => {
  //  console.log(
  //   "userForgotpassOTPAsCredentials ",
  //   userForgotpassOTPAsCredentials
  // );
  return async (dispatch) => {
    try {
      const { data } = await axios({
        method: "Post",
        // url: "http://localhost:5000/users/varifyotp",
        url:
          "https://robin--project-mern-backend.herokuapp.com/users/varifyotp",
        data: userForgotpassOTPAsCredentials,
      });
      // console.log("OTPVarify data from user action FILE : ", data);
      if (data.OTPVARIFYsuccess) {
        dispatch(userForgotPassOtpVarifyAction(data));
        dispatch({
          type: "HAVE_TO_STOP_SPINNER",
        });
      } else {
        dispatch({
          type: "SET_FORGOTPASSWORD_OTP_VARIFY_ERRORS",
          payload: data,
        });
        dispatch({
          type: "HAVE_TO_STOP_SPINNER",
        });
      }
    } catch (err) {
      console.log("from catch block");
      dispatch({
        type: "SET_FORGOTPASSWORD_OTP_VARIFY_ERRORS",
        payload: err.message,
      });
      console.log("Error in USERPASSWORD OTP varify Action file ", err.message);
    }
  };
};

export const getAllUsers = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        method: "Get",
        url: "http://localhost:5000/users/getAllUsers",
      });
      dispatch({
        type: "SET_ALL_USERS",
        payload: data.message,
      });
    } catch (err) {
      dispatch({
        type: "SET_FORGOTPASSWORD_OTP_VARIFY_ERRORS",
        payload: err,
      });
    }
  };
};

export const getAllInvesters = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        method: "Get",
        url: "http://localhost:5000/users/getallinvesters",
      });
      dispatch({
        type: "SET_ALL_INVESTERS",
        payload: data.message,
      });
    } catch (err) {
      dispatch({
        type: "SET_FORGOTPASSWORD_OTP_VARIFY_ERRORS",
        payload: err,
      });
    }
  };
};

// =========================================== [ NEW CREDIENTIALS ] This is for HITTING [BACKEND] end point =====================================//
export const userForgotPassNEWCredentialsFromUserAction = (
  userForgotpassNEWCredentials,
  history
) => {
  // console.log(
  //   "userForgotpassNEWCredentials ",
  //   userForgotpassNEWCredentials
  // );
  return async (dispatch) => {
    try {
      const { data } = await axios({
        method: "Post",
        // url: "http://localhost:5000/users/changepassword",
        url:
          "https://robin--project-mern-backend.herokuapp.com/users/changepassword",
        data: userForgotpassNEWCredentials,
      });
      //  console.log(
      //   "userForgotpassNEWCredentials data from user action FILE : ",
      //   data
      // );
      if (data.success) {
        dispatch(userForgotpassNEWCredentialsAction(data));
        dispatch({
          type: "HAVE_TO_STOP_SPINNER",
        });
        setTimeout(() => {
          history.push("/login");
        });
      } else {
        dispatch({
          type: "SET_FORGOTPASSWORD_OTP_VARIFY_ERRORS",
          payload: data,
        });
        dispatch({
          type: "HAVE_TO_STOP_SPINNER",
        });
      }
    } catch (err) {
      console.log("from catch block");
      dispatch({
        type: "SET_FORGOTPASSWORD_OTP_VARIFY_ERRORS",
        payload: err.message,
      });
      console.log("Error in USERPASSWORD OTP varify Action file ", err.message);
    }
  };
};

export const setUserLoggedIn = (data) => {
  return {
    type: SET_USER_LOGGED_IN,
    payload: data,
  };
};

export const setUserNameInsideAsidebar = (data) => {
  return {
    type: "USERNAME_FOR_ASIDEBAR_DATA_INTO_REDUX_STORE",
    payload: data,
  };
};

export const userLogout = () => {
  return (dispatch) => {
    localStorage.removeItem("userJwtToken");
    setAuthToken(false);
    dispatch(userLogoutAction({}));
    dispatch(setUserNameInsideAsidebar("USER"));
  };
};
