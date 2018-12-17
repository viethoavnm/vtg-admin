import axios from '../../utils/api';

export const createHotel = (data) => (axios.post('/api/hotel/', data));