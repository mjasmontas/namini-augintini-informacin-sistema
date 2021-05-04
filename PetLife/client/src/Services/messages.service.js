import axios from 'axios';
import authHeader from './auth-header';

class MessageService {
  getAllMessages() {
    return axios.get('/api/admin/messages', { headers: authHeader()  });
  }

  addNewMessage( name, email, subject, message) {
    return axios.post('/api/message', { 
        name,
        email,
        subject,
        message
    });
  }

  deleteMessage(id){
    return axios.delete('/api/message/' + id, { headers: authHeader()  });
  }
}

export default new MessageService();