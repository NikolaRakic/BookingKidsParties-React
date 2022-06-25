import BookingKidsPartiesClient from "./Clients/BookingKidsPartiesClient";

export const PhotoService = {
    uploadPhoto,
    getPhotos,
    deletePhoto
  };

  async function uploadPhoto(image, serviceProviderId) {
    return await BookingKidsPartiesClient.post(`/photos/${serviceProviderId}/upload`, image) 
  }

  async function getPhotos(serviceProviderId) {
  return await BookingKidsPartiesClient.get(`/photos/${serviceProviderId}`);
}

async function deletePhoto(photoId) {
  return await BookingKidsPartiesClient.delete(`/photos/${photoId}`) 
}

