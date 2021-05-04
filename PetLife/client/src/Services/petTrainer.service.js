import axios from 'axios';
import authHeader from './auth-header';

class PetTrainerService {
  getAllTrainersVisits(id) {
    return axios.get('/api/trainer/' + id, { headers: authHeader()  });
  }

  addNewTrainerVisit(id, petOwnerName, petOwnerPhoneNumber, petName, trainersNote, startDate, endDate) {
    return axios.post('/api/user/' + id + '/trainerVisit', { 
        petOwnerName,
        petOwnerPhoneNumber,
        petName,
        trainersNote,
        startDate,
        endDate
    });
  }

  deleteTrainerVisit(id){
    return axios.delete('/api/trainerVisit/' + id, { headers: authHeader()  });
  }
}

export default new PetTrainerService();