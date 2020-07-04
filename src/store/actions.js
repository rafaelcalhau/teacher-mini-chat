import ActionTypes from './types'

export const authenticate = (user) => {
  const payload = user
  return { type: ActionTypes.AUTHENTICATED, payload }
}

export const authenticationIsVerified = () => {
  return { type: ActionTypes.AUTHENTICATION_VERIFIED }
}

export const signout = () => {
  return { type: ActionTypes.SIGN_OUT }
}
