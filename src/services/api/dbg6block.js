import axios from "axios";

export const Dbpmtag = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/services/api/dbpmtag"
    );
    return response.data;
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการเรียกข้อมูล API :", error);
    throw error;
  }
};
