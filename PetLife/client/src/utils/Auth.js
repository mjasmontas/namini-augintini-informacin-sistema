import axios from "axios";

function Auth() {
  function logIn(email, password) {
    return axios
      .post("/api/authenticate", {
        email: email,
        password: password
      })
      .then(response => {
        const token = response.data.token;
        localStorage.setItem("token", token);
        return response.data;
      });
  }

  function getToken() {
    return localStorage.getItem("token");
  }

  function logOut(cb) {
    localStorage.removeItem("token");
    return Promise.resolve();
  }

  function isLoggedIn() {
    return !!getToken();
  }

  return {
    logIn,
    logOut,
    isLoggedIn,
    getToken
  };
}

export default Auth();
