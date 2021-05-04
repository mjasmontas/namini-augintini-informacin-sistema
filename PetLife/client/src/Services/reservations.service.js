import axios from 'axios';
import authHeader from './auth-header';

class ReservationService {

  getAllReservations() {
    return axios.get('/api/admin/reservations', { headers: authHeader()  });
  }

  getAllUsersReservations(id) {
    return axios.get('/api/user/' + id + '/reservations', { headers: authHeader()  });
  }

  addNewReservation(owner, pet, petName, startDate, endDate, clientNotes, veterinarianVisit, veterinarianNote, trainerVisit, trainerNote, price) {
    return axios.post('/api/user/' + owner + '/createReservation', { 
        owner,
        pet,
        petName,
        startDate,
        endDate,
        clientNotes,
        veterinarianVisit,
        veterinarianNote,
        trainerVisit,
        trainerNote,
        price
    });
  }

  deleteReservation(id){
    return axios.delete('/api/reservation/' + id, { headers: authHeader()  });
  }
}

export default new ReservationService();