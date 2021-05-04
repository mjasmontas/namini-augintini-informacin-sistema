import axios from "axios";

class AuthService {
  login(email, password) {
    return axios
      .post("http://localhost:3001/api/auth/signin", {
        email,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
    return Promise.resolve();
  }

  register(firstName, lastName, email, phoneNumber, password, roles) {
    return axios.post("http://localhost:3001/api/auth/signup", {
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      roles
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();