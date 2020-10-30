import { SHOW_ERRORS, CLEAR_ERRORS } from "./types";

export const showErrors = (msg, status) => {
  console.log("calling from here", msg);
  return {
    type: SHOW_ERRORS,
    payload: {
      msg,
      status,
    },
  };
};

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
