import BookingKidsPartiesClient from "./Clients/BookingKidsPartiesClient";
const ratingService = {
    
  getAverageRatingValueByServiceProviderId(serviceProviderId) {
    return BookingKidsPartiesClient.get("/ratings", { params: { serviceProviderId: serviceProviderId } });
  },

  getAllRatingByServiceProviderId(serviceProviderId){
    return BookingKidsPartiesClient.get(`/ratings/${serviceProviderId}`);
  }

};
export default ratingService;