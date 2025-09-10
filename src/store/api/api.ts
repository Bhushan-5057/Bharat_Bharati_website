import axiosInstance from "./axiosInstance";

export const getAllBanners = async () => {
  const response = await axiosInstance.get("/banner/get-all");
  return response.data;
};

export const getAllFeatures = async () => {
  const response = await axiosInstance.get("/service/get-all");
  return response.data;
};

export const getAllTestimonials = async () => {
  const response = await axiosInstance.get("/office_bearer/get-all");
  return response.data;
};

export const createAppointment = async (formData: {
  name: string;
  email: string;
  contact_number: string;
  date: string;
  time: string;
  reason_of_meeting: string;
  your_expectation: string;
  more_details: string;
}) => {
  const response = await axiosInstance.post("/appointment/create", formData);
  return response.data;
};

export const getAllCertificates = async () => {
  const response = await axiosInstance.get("/certificate/get-all");
  return response.data;
};



export const getCertificateById = async (id: number) => {
  const response = await axiosInstance.get(`/certificate/get/${id}`, {
    responseType: "arraybuffer",
  });

  const contentDisposition = response.headers["content-disposition"];
  let fileName = "document.pdf";
  if (contentDisposition) {
    const match = contentDisposition.match(/filename="?([^"]+)"?/);
    if (match?.[1]) fileName = match[1];
  }

  return { pdfData: response.data, fileName };
};

export const getAllIntegrations = async () => {
  const response = await axiosInstance.get("/integration/get-all");
  return response.data;
}

