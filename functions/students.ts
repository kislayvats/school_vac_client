import { API_PREFIX } from "@/config";
import axios from "axios";

export const getAllStudentsAPI = async (
  page: number,
  limit: number,
  search: string,
  token: string,
) => {
  const response = await axios.get(`${API_PREFIX.STUDENT}`, {
    params: { page, limit, search },
    headers: { Authorization: token, "ngrok-skip-browser-warning": "69420" },
  });
  return response.data?.data;
};

export const getStudentByIdAPI = async (id: string, token: string) => {
  const response = await axios.get(`${API_PREFIX.STUDENT}/${id}`, {
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "69420",
    },
  });
  return response.data;
};

export const updateStudentAPI = async (id: string, studentData: any, token: string) => {
try {
  const response = await axios.put(`${API_PREFIX.STUDENT}/update?student_id=${id}`, studentData, {
    headers: { Authorization: token },
  });
  return response.data;
} catch (error) {
  console.error("Update student failed:", error);
  return {
      success: false,
      message: "Update student failed",
    };
  }
};





export const createStudentAPI = async (
  studentData: {
    name: string;
    mobile_number: string;
    email: string;
    class: string;
  },
  token: string
) => {
  const response = await axios.post(`${API_PREFIX.STUDENT}/add`, studentData, {
    headers: { Authorization: token },
  });
  return response.data;
};

export const addStudentsInBulkAPI = async (file: File, token: string) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post(`${API_PREFIX.STUDENT}/bulk-add`, formData, {
      headers: { 
        Authorization: token,

      },
    });
    return response.data;
  } catch (error) {
    console.error("Bulk upload failed:", error);
    return {
      success: false,
      message: "Bulk upload failed",
    };
  }
};
