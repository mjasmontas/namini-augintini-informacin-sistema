import axios from 'axios';
import authHeader from './auth-header';

class PetService {
  getAllUsersPets(id) {
    return axios.get('/api/user/' + id + '/petFamily', { headers: authHeader()  });
  }

  getPet(id){
    return axios.get('/api/pet/' + id, { headers: authHeader()  });
  }

  addNewPet(id, image, name, type, years, allergies, tamparament, size) {
    console.log(type)
    return axios.post('/api/user/' + id + '/createPet', { 
        image,
        name,
        type,
        years,
        allergies,
        tamparament,
        size,
    });
  }

  updatePet(id, name, type, birthday, allergies, temperament, size){
    return axios.put('/api/pet/' + id, { 
      name,
      type,
      birthday,
      allergies,
      temperament,
      size,
  });
  }

  deletePet(id){
    return axios.delete('/api/pet/' + id, { headers: authHeader()  });
  }
}

export default new PetService();