import axios from 'axios';
import authHeader from './auth-header';

class VeterinarianService {
  getAllVetVisits(id) {
    return axios.get('/api/veterinarian/' + id, { headers: authHeader()  });
  }

  addNewVetVisit(id, petOwner, petOwnerName, pet, petName, veterinarianNotes, startDate) {
    return axios.post('/api/user/' + id + '/veterinarianVisit', { 
        petOwner,
        petOwnerName,
        pet,
        petName,
        veterinarianNotes,
        startDate
    });
  }

  deleteVetVisit(id){
    return axios.delete('/api/veterinarianVisit/' + id, { headers: authHeader()  });
  }
}

export default new VeterinarianService();