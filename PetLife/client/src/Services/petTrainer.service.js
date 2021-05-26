import axios from 'axios';
import authHeader from './auth-header';

class PetTrainerService {
  getAllTrainersVisits(id) {
    return axios.get('/api/trainer/' + id, { headers: authHeader()  });
  }

  addNewTrainerVisit(id, petOwnerName, petOwnerPhoneNumber, petName, petType, petSize, trainersNote, startDate) {
    return axios.post('/api/user/' + id + '/trainerVisit', { 
        petOwnerName,
        petOwnerPhoneNumber,
        petName,
        petType,
        petSize,
        trainersNote,
        startDate
    });
  }

  deleteTrainerVisit(id){
    return axios.delete('/api/trainerVisit/' + id, { headers: authHeader()  });
  }
}

export default new PetTrainerService();