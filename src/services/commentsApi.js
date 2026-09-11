import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/comments";

// GET
export const getComments = () => {
  return axios.get(API_URL);
};

// POST
export const createComment = (comment) => {
  return axios.post(API_URL, comment);
};

// PATCH
export const updateComment = (id, comment) => {
  return axios.patch(`${API_URL}/${id}`, comment);
};

// DELETE
export const deleteComment = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};