import axios from "axios";
import authHeader from './auth-header';


class SidebarService {
    getUser(userId) {
      return axios
        .get("http://localhost:3001/api/user/" + userId, { headers: authHeader()  })
    }
  }
  
  export default new SidebarService();