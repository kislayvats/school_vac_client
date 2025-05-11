import {
  loginWithEmailAndPasswordAPI,
  registerWithEmailAndPasswordAPI,
} from "./auth";
import {
  getAllStudentsAPI,
  getStudentByIdAPI,
  createStudentAPI,
  addStudentsInBulkAPI,
  updateStudentAPI,
} from "./students";
import {
  createVaccinationDriveAPI,
  updateVaccinationDriveAPI,
  getVaccinationDriveByIdAPI,
  getAllVaccinationDrivesAPI,
  updateVaccinationDriveStatusForStudentAPI,
} from "./vaccination";
import { getPageStatsAPI } from "./home";
export {
  // auth
  loginWithEmailAndPasswordAPI,
  registerWithEmailAndPasswordAPI,
  // students
  getAllStudentsAPI,
  getStudentByIdAPI,
  createStudentAPI,
  addStudentsInBulkAPI,
  updateStudentAPI,
  // vaccination
  createVaccinationDriveAPI,
  updateVaccinationDriveAPI,
  getVaccinationDriveByIdAPI,
  getAllVaccinationDrivesAPI,
  updateVaccinationDriveStatusForStudentAPI,
  // home
  getPageStatsAPI,
};
