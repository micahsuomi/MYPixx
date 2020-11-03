//auth validators
const nameValidator = /[A-Za-z]{3,16}$/gi;
const emailValidator = /^[a-z0-9.-_]+@[a-z0-9.-_]+\.[a-z]{2,}$/gi;
const passwordValidator =
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})";

module.exports = {
  nameValidator,
  emailValidator,
  passwordValidator,
};
