//auth validators
export const nameValidator = /[A-Za-z]{3,16}$/gi
export const emailValidator = /^[a-z0-9.-_]+@[a-z0-9.-_]+\.[a-z]{2,}$/gi
export const passwordValidator =
  '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'

//book validators
export const isbnValidator = /[0-9]*[-| ][0-9]*[-| ][0-9]*[-| ][0-9]*[-| ][0-9]*/
