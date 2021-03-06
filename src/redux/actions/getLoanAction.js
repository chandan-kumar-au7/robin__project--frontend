import axios from "axios";
// import jwt_decode from "jwt-decode";

// =========== It will be imported inside the { PAGES folder } where ever we will be needing {  admin adminFORGOTPASSWORD [ BACKEND ] DATA } =========//
export const GetLoanCrediantialsAction = (data) => {
  return {
    type: "GET_LOAN_DATA",
    payload: data,
  };
};

export const loanAmountAndTenor = (data) => {
  // console.log("loanAmount_And_Tenor ", data);
  return {
    type: "LOANAMOUNT_AND_TENOR",
    payload: data,
  };
};

export const GetLoanFunctionFromGetLoanAction = (
  GetLoanDataFromForm,
  history,
  userId
) => {
  console.log("fetching GetLoan ...");

  // console.log("GetLoanDataFromForm ", GetLoanDataFromForm);

  return async (dispatch) => {
    try {
      // dispatch(postUploadLoaderFlagHelper(true))
      const { data } = await axios({
        method: "Post",
        // url: "http://localhost:5000/users/getloan",
        url: "https://robin--project-mern-backend.herokuapp.com/users/getloan",
        data: GetLoanDataFromForm,
      });
      // history.push(`/usersPost/${userId}`)
      dispatch(GetLoanCrediantialsAction(data));
      dispatch({
        type: "HAVE_TO_STOP_SPINNER",
      });
      // console.log("dataAsResponseFromGetLoanAction.js ", data);

      dispatch({
        type: "SET_LOGIN_ERRORS",
        payload: data.msg,
      });

      history.push("/login");

      setTimeout(() => {
        dispatch({
          type: "SET_LOGIN_ERRORS",
          payload: {},
        });
      }, 6000);
    } catch (err) {
      dispatch({
        type: "HAVE_TO_STOP_SPINNER",
      });
      console.log("Error in dataAsResponseFromGetLoanAction", err.message);
    }
  };
};
