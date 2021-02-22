//ALL regex validators go here

//registration
export const nameValidator = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g
export const emailValidator = /^[a-z0-9.-_]+@[a-z0-9.-_]+\.[a-z]{2,}$/gi
export const passwordValidator =
  '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'

//books, authors
export const isbnValidator = /[0-9]*[-| ][0-9]*[-| ][0-9]*[-| ][0-9]*[-| ][0-9]*/
export const firstNameValidator = /^[a-zA-Z]+(([\'\,\.\- ][a-zA-Z ])?[a-zA-Z]*)*$/
export const lastNameValidator = /^[a-zA-Z]+(([\'\,\.\- ][a-zA-Z ])?[a-zA-Z]*)*$/
export const yearValidator = /[^0-9]/g
export const linkRef = /<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1/
