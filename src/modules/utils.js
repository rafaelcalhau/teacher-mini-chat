export const formatUserData = (data) => {
  return {
    uid: data.uid,
    name: data.displayName,
    email: data.email,
    isVerified: data.emailVerified,
    refreshToken: data.refreshToken
  }
}

export const isValidEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}
