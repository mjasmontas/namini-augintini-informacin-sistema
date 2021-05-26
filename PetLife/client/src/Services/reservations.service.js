import axios from 'axios';
import authHeader from './auth-header';

class ReservationService {

  getAllReservations() {
    return axios.get('/api/admin/reservations', { headers: authHeader()  });
  }

  getAllUsersReservations(id) {
    return axios.get('/api/user/' + id + '/reservations', { headers: authHeader()  });
  }

  getUserReservation(id) {
    return axios.get('/api/admin/reservation/' + id, { headers: authHeader()  });
  }

  updateReservation(id, status){
    return axios.put('/api/admin/reservation/' + id, { status: status })
  }

  addNewReservation(owner, ownerName, ownerPhoneNumber, pet, petName, startDate, endDate, clientNotes, price, createdAt, status) {
    return axios.post('/api/user/' + owner + '/createReservation', { 
        owner,
        ownerName,
        ownerPhoneNumber,
        pet,
        petName,
        startDate,
        endDate,
        clientNotes,
        price,
        createdAt,
        status
    });
  }

  deleteReservation(id){
    return axios.delete('/api/reservation/' + id, { headers: authHeader()  });
  }
}

export default new ReservationService();