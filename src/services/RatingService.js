import BookingKidsPartiesClient from "./Clients/BookingKidsPartiesClient";
const ratingService = {
    
  getAverageRatingValueByServiceProviderId(serviceProviderId) {
    return BookingKidsPartiesClient.get("/ratings", { params: { serviceProviderId: serviceProviderId } });
  },

  getAllRatingByServiceProviderId(serviceProviderId){
    return BookingKidsPartiesClient.get(`/ratings/${serviceProviderId}`);
  },

  saveRating(requestData){
    return BookingKidsPartiesClient.post("/ratings", requestData)
  }

};
export default ratingService;