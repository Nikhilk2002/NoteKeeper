import { userInstance } from '../Axios/axiosInstance';



export const signup =(value) =>{
  return userInstance.post("/signup",{...value});
};

export const login =(value)=>{
  return userInstance.post("/login",{...value});
};


export const addNotes = async (note) => {
  try {
    const response = await userInstance.post('/addnotes', note);
    return response.data;
  } catch (error) {
    console.error('Error in addNotes:', error.response ? error.response.data : error.message);
    throw error.response ? error.response.data : new Error('Network Error');
  }
};


export const getAllNotes = async () => {
  try {
    const response = await userInstance.get('/allnotes');
    return response.data; // This should be an array of notes
  } catch (error) {
    console.error('Error in getAllNotes:', error.response ? error.response.data : error.message);
    throw error;
  }
};



export const deleteNote = async (id) => {
  try {
    const response = await userInstance.delete(`/allnotes/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error in deleteNote:', error.response ? error.response.data : error.message);
    throw error.response ? error.response.data : new Error('Network Error');
  }
};


export const editNote = async (id, updatedNote) => {
  try {
    const response = await userInstance.put(`/allnotes/${id}`, updatedNote);
    return response.data;
  } catch (error) {
    console.error('Error in editNote:', error.response ? error.response.data : error.message);
    throw error.response ? error.response.data : new Error('Network Error');
  }
};



export const userStatus = () => {
  return userInstance.get("/auth/status").then((response) => response.data).catch((error) => {
    console.log("Error fetching user status : ", error);
    return { user : null};
  });
};