const Auth = {
  validateAdmin(user) {
    return user.roleId === 1;
  },
  docAccess(user, doc) {
    return Auth.validateAdmin(user) ? true : user.id === doc.ownerId;
  }
}

export default Auth;