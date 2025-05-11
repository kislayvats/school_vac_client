import { API_PREFIX } from "@/config";
import axios from "axios";

export const getPageStatsAPI = async (token: string) => {
  const response = await axios.get(
    `${API_PREFIX.VACCINATION_DRIVE}/all/statistics`,
    {
      headers: { Authorization: token, "ngrok-skip-browser-warning": "69420" },
    }
  );
  return response.data?.data;
};
