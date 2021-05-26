import axios from 'axios';
import authHeader from './auth-header';

class UserService {
  getAllUsers() {
    return axios.get('/api/users/', { headers: authHeader()  });
  }

  getUser(id){
    return axios.get('/api/user/' + id, { headers: authHeader()  })
  }

  updateUser(id, roles){
    return axios.put('/api/admin/user/' + id, { roles: roles })
  }

  updateProfileUser(id, firstName, lastName, email, phoneNumber, years, address, city, zipCode){
    return axios.put('/api/user/profile/' + id, { 
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
      years: years,
      address: address,
      city: city,
      zipCode: zipCode    
    })
  }

  deleteUser(id){
    return axios.delete('/api/admin/user/' + id, { headers: authHeader()  })
  }

  addNewUser(firstName, lastName, email, phoneNumber, password, roles) {
    return axios.post('/api/auth/signup', {
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      roles
    });
  }
}

export default new UserService();