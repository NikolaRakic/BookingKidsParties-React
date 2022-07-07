import BookingKidsPartiesClient from "./Clients/BookingKidsPartiesClient";

export const CooperationService = {
    getAllByServiceProvider,
    sendCooperationRequest,
    cancelCooperation
  };
  
    
  async function getAllByServiceProvider(serviceProviderId) {
      return await BookingKidsPartiesClient.get(`cooperations/${serviceProviderId}`);
  }

  async function sendCooperationRequest(requestData) {
    console.log(requestData)
    return await BookingKidsPartiesClient.post("cooperations", requestData);
}

async function cancelCooperation(req) {
    console.log(req)
    return await BookingKidsPartiesClient.delete("cooperations?playroomId=" + req.playroomId + "&cooperationServiceId="+req.cooperationServiceId);
}