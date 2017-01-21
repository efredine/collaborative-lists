class Auth {

  /**
   * Authenticate a user. Save a token string in Local Storage
   *
   * @param {string} token
   */
  static authenticateUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  /**
   * Check if a user is authenticated - check if a user is saved in Local Storage
   *
   * @returns {boolean}
   */
  static isUserAuthenticated() {
    return localStorage.getItem('user') !== null;
  }

  /**
   * Deauthenticate a user. Remove a user from Local Storage.
   *
   */
  static deauthenticateUser() {
    localStorage.removeItem('user');
  }

  /**
   * Get a user value.
   *
   * @returns {string}
   */

  static getToken() {
    return JSON.parse(localStorage.getItem('user'));
  }

}

export default Auth;