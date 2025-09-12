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
  let fileName = "भारत भारती ट्रस्ट | राष्ट्रीय एकात्मता को समर्पित";
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


export const getAllActivities = async () => {
  const response = await axiosInstance.get("/activities/get-all");
  return response.data; 
};


export const getActivityById = async (id: number) => {
  const response = await axiosInstance.get(`/activities/get/${id}`);
  const activity = response.data;


  const imageUrl = `data:image/png;base64,${activity.data}`;

  return {
    ...activity,
    imageUrl, 
  };
};

export const getAllEducation = async () => {
  const response = await axiosInstance.get("/education/get-all?type=education");
  return response.data;
};

export const getAllSchools = async () => {
  const response = await axiosInstance.get("/education/get-all?type=school");
  return response.data;
};

export const getSchoolById = async (id: number) => {
  const response = await axiosInstance.get(`/education/get/${id}`);
  return response.data;
};


export const getAllCities = async () => {
  const response = await axiosInstance.get("/cities/get-all");
  return response.data;
};

export const getCityById = async (id: number) => {
  const response = await axiosInstance.get(`/cities/get/${id}`);
  return response.data;
};

export const getAllImages = async () => {
  const response = await axiosInstance.get("/gallery_image/get-all");
  return response.data;
};

export const getImagesBId = async (id: number) => {
  const response = await axiosInstance.get(`/gallery_image/get/${id}`);
  return response.data;
};
export const getAllVideos = async () => {
  const response = await axiosInstance.get("/gallery_video/get-all");
  return response.data;
};

export const getVideoById = async (id: number) => {
  const response = await axiosInstance.get(`/gallery_video/get/${id}`);
  return response.data;
};

export const getAllDonations = async () => {
  const response = await axiosInstance.get("/donation_page/get-all");
  return response.data;
};