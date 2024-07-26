import { userInstance } from '../Axios/axiosInstance';

export const addNotes = async (note) => {
  try {
    const response = await userInstance.post('/addnotes', note);
    return response.data;
  } catch (error) {
    console.error('Error in addNotes:', error.response ? error.response.data : error.message);
    throw error.response ? error.response.data : new Error('Network Error');
  }
};
