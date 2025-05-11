import { API_PREFIX } from "@/config/apiPrefix";
import axios from "axios";

export const createVaccinationDriveAPI = async (data: any, token: string) => {
  const response = await axios.post(
    `${API_PREFIX.VACCINATION_DRIVE}/create`,
    data,
    {
      headers: {
        Authorization: token,
      },
    }
  );
  return response.data?.data;
};

export const updateVaccinationDriveAPI = async (data: any,vacId: string, token: string) => {
  try {
    const response = await axios.put(
    `${API_PREFIX.VACCINATION_DRIVE}/update?vaccination_drive_id=${vacId}`,
    data,
    {
      headers: {
        Authorization: token,
      },
    }
  );
  return response.data?.data;
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Vaccination drive not found",
    };
  }
};

export const getVaccinationDriveByIdAPI = async (id: string,page: number, limit: number, status: string, token: string) => {
  try {
    const response = await axios.get(`${API_PREFIX.VACCINATION_DRIVE}/students/${id}?page=${page}&limit=${limit}&status=${status}`, {
      headers: {
        Authorization: token,
        "ngrok-skip-browser-warning": "69420",
      },
    });
    return response.data?.data;
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Vaccination drive not found",
    };
  }
};

export const getAllVaccinationDrivesAPI = async (
  page: number,
  limit: number,
  filterValue: string,
  status: string,
  token: string
) => {
  try {
    const response = await axios.get(
      `${API_PREFIX.VACCINATION_DRIVE}?page=${page}&limit=${limit}&search=${filterValue}&status=${status}`,
      {
        headers: {
          Authorization: token,
          "ngrok-skip-browser-warning": "69420",
        },
      }
    );
    console.log(response.data?.data);
    return response.data?.data;
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Vaccination drive not found",
    };
  }
};

export const updateVaccinationDriveStatusForStudentAPI = async (values: any, token: string) => {
try {
  const response = await axios.put(`${API_PREFIX.VACCINATION_DRIVE}/update-vaccination-drive-student`, values, {
    headers: {
      Authorization: token,
    },
      }
    );
    return response.data?.data;
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Vaccination drive not found",
    };
  }
};
