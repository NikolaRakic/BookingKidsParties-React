import BookingKidsPartiesClient from "./Clients/BookingKidsPartiesClient";
export const ServiceProviderService = {
  getAllByType,
  getOneById,
  isValidDataForRegistration,
  registration,
  getTypeServiceProvider,
  edit
};

  
async function getAllByType(type) {
    return await BookingKidsPartiesClient.get(`serviceProviders/type/${type}`);
}

async function getOneById(id){
  return await BookingKidsPartiesClient.get(`serviceProviders/${id}`);
}

async function registration(newServiceProvider) {
  return await BookingKidsPartiesClient.post("/serviceProviders", newServiceProvider);
}

async function getTypeServiceProvider(serviceProviderId) {
  return await BookingKidsPartiesClient.get(`/serviceProviders/typeByServiceProviderId/${serviceProviderId}`);
}

async function edit(serviceProvider, serviceProviderId){
  return await BookingKidsPartiesClient.put(`/serviceProviders/${serviceProviderId}`, serviceProvider)
}

function isValidDataForRegistration(newServiceProvider){
  console.log(newServiceProvider)
  return (
    newServiceProvider.username.trim() !== "" &&
    newServiceProvider.email.trim() !== "" &&
    newServiceProvider.startOfWork.trim() !== "" &&
    newServiceProvider.endOfWork.trim() !== "" &&
    //newServiceProvider.maxNumberOfKids.trim() !== "" &&
    newServiceProvider.typeOfServiceProvider.trim() !== "" &&
    newServiceProvider.city.trim() !== "" &&
    newServiceProvider.adress.trim() !== "" &&
    newServiceProvider.telephoneNumber.trim() !== "" &&
    newServiceProvider.pib.trim() !== "" &&
    newServiceProvider.accountNumber.trim() !== "" 
  )
}