import ActionTypes from './types'

export const authenticate = (user) => {
  return { type: ActionTypes.AUTHENTICATED, user }
}

export const authenticationIsVerified = () => {
  return { type: ActionTypes.AUTHENTICATION_VERIFIED }
}

export const signout = () => {
  return { type: ActionTypes.SIGN_OUT }
}

export const updateUser = (payload) => {
  return { type: ActionTypes.UPDATE_USER, payload }
}
